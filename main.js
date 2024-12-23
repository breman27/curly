const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

function createWindow() {
  // Note the webPreferences block with preload
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false, // recommended for security
      contextIsolation: true, // recommended for security
    },
  });

  if (isDev) {
    // Load from Vite dev server during development
    win.loadURL("http://localhost:5173");
  } else {
    // Load from the `dist` folder in production
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }
}

// Setup IPC handlers for requests
ipcMain.handle("send-request", async (event, requestData) => {
  const { method, url, headers, body } = requestData;
  // Example using axios (simpler than curl):
  const axios = require("axios");
  try {
    const response = await axios({ method, url, headers, data: body });
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
    };
  } catch (error) {
    return { error: error.message, response: error.response };
  }
});

// Load collections
ipcMain.handle("load-collections", (event) => {
  const dataPath = path.join(__dirname, "data", "collections.json");
  if (!fs.existsSync(dataPath)) return { collections: [] };
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
});

// Save collections
ipcMain.handle("save-collections", (event, collections) => {
  const dataPath = path.join(__dirname, "data", "collections.json");
  fs.writeFileSync(dataPath, JSON.stringify({ collections }, null, 2), "utf8");
  return { success: true };
});

app.whenReady().then(createWindow);

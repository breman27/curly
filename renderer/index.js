const { ipcRenderer } = require("electron");

document.getElementById("sendBtn").addEventListener("click", async () => {
  const method = document.getElementById("method").value;
  const url = document.getElementById("url").value;

  const requestData = {
    method: method,
    url: url,
    headers: {}, // You can add a UI to input headers
    body: "", // Similarly, a UI element for body (textarea)
  };

  const response = await ipcRenderer.invoke("send-request", requestData);
  document.getElementById("responseOutput").textContent = JSON.stringify(
    response,
    null,
    2
  );
});

// Loading and rendering collections
async function loadCollections() {
  const data = await ipcRenderer.invoke("load-collections");
  const list = document.getElementById("collections-list");
  list.innerHTML = "";
  data.collections.forEach((col, i) => {
    const li = document.createElement("li");
    li.textContent = col.name;
    li.onclick = () => loadCollectionDetail(col);
    list.appendChild(li);
  });
}

function loadCollectionDetail(collection) {
  // Show collection requests somehow, or allow loading a request from it
  console.log("Loaded collection:", collection);
}

document
  .getElementById("saveCollectionsBtn")
  .addEventListener("click", async () => {
    // For demonstration, just save a static collection
    const sampleCollections = [
      {
        name: "My API Tests",
        requests: [
          {
            name: "Get Users",
            method: "GET",
            url: "https://api.example.com/users",
            headers: {},
            body: "",
          },
        ],
      },
    ];
    await ipcRenderer.invoke("save-collections", sampleCollections);
    await loadCollections();
  });

loadCollections();

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", async () => {
      const method = document.getElementById("method").value;
      const url = document.getElementById("url").value;

      const requestData = {
        method: method,
        url: url,
        headers: {}, // You can add a UI to input headers
        body: "", // Similarly, a UI element for body (textarea)
      };

      const response = await window.electron.ipcRenderer.invoke(
        "send-request",
        requestData
      );
      document.getElementById("responseOutput").textContent = JSON.stringify(
        response,
        null,
        2
      );
    });
  } else {
    console.error("sendBtn element not found");
  }

  // Loading and rendering collections
  async function loadCollections() {
    const data = await window.electron.ipcRenderer.invoke("load-collections");
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
  }

  // Call loadCollections to initialize the collections list
  loadCollections();
});

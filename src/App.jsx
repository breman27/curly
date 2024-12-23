import React, { useEffect, useState } from "react";

function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState(null);
  const [collections, setCollections] = useState([]);

  // Load collections on mount
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    // Adjust this if your preload script exposes differently
    const data = await window.api.invoke("load-collections");
    setCollections(data.collections || []);
  };

  const loadCollectionDetail = (collection) => {
    // Here you can set state related to selected collection if needed
    // or trigger showing a particular request in the form fields
    console.log("Loaded collection:", collection);
  };

  const sendRequest = async () => {
    const requestData = { method, url, headers: {}, body: requestBody };
    const res = await window.api.invoke("send-request", requestData);
    setResponse(res);
  };

  const saveCollections = async () => {
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
    await window.api.invoke("save-collections", sampleCollections);
    await loadCollections();
  };

  return (
    <>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Collections</h2>
        <ul>
          {collections.map((col, i) => (
            <li key={i} onClick={() => loadCollectionDetail(col)}>
              {col.name}
            </li>
          ))}
        </ul>
        <button onClick={saveCollections}>Save Collections</button>
      </div>

      {/* Main Area */}
      <div className="main">
        <div className="request-form">
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input
            type="text"
            value={url}
            placeholder="Enter URL"
            onChange={(e) => setUrl(e.target.value)}
          />
          <textarea
            value={requestBody}
            placeholder="Enter request body"
            onChange={(e) => setRequestBody(e.target.value)}
            className="w-full"
          ></textarea>
          <button onClick={sendRequest}>Send</button>
        </div>
        <div className="response">
          <h3>Response</h3>
          <pre>{response ? JSON.stringify(response, null, 2) : ""}</pre>
        </div>
      </div>
    </>
  );
}

export default App;

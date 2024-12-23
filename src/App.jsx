import React, { useEffect, useState } from "react";
import RequestTab from "./RequestTab";

function App() {
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
            <li key={i} onClick={() => console.log("Loaded collection:", col)}>
              {col.name}
            </li>
          ))}
        </ul>
        <button onClick={saveCollections}>Save Collections</button>
      </div>

      {/* Main Area */}
      <div className="main">
        <RequestTab />
      </div>
    </>
  );
}

export default App;

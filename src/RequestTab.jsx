import React, { useState } from "react";

function RequestTab() {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "Tab 1",
      method: "GET",
      url: "",
      requestBody: "",
      response: null,
    },
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const sendRequest = async () => {
    console.log("Sending request from tab:", activeTab);
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    const requestData = {
      method: activeTabData.method,
      url: activeTabData.url,
      headers: {},
      body: activeTabData.requestBody,
    };
    const res = await window.api.invoke("send-request", requestData);
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab ? { ...tab, response: res } : tab
      )
    );
  };

  const addTab = () => {
    const newTab = {
      id: tabs.length + 1,
      name: `Tab ${tabs.length + 1}`,
      method: "GET",
      url: "",
      requestBody: "",
      response: null,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const updateTabData = (id, data) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, ...data } : tab)));
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="request-tab">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
        <button onClick={addTab}>+</button>
      </div>
      <div className="request-form">
        <select
          value={activeTabData.method}
          onChange={(e) => updateTabData(activeTab, { method: e.target.value })}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          value={activeTabData.url}
          placeholder="Enter URL"
          onChange={(e) => updateTabData(activeTab, { url: e.target.value })}
        />
        <textarea
          value={activeTabData.requestBody}
          placeholder="Enter request body"
          onChange={(e) =>
            updateTabData(activeTab, { requestBody: e.target.value })
          }
          className="w-full"
        ></textarea>
        <button onClick={sendRequest}>Send</button>
      </div>
      <div className="response">
        <h3>Response</h3>
        <pre>
          {activeTabData.response
            ? JSON.stringify(activeTabData.response, null, 2)
            : ""}
        </pre>
      </div>
    </div>
  );
}

export default RequestTab;

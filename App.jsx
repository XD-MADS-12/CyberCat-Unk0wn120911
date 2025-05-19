import React, { useState } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import ToolOutput from './ToolOutput';
import Footer from './Footer';
import './style.css';

function App() {
  const [output, setOutput] = useState("Welcome to Cyber Cat Unkn0wn Toolkit. Choose a tool above.");

  const loadTool = async (tool) => {
    if (tool === 'ip') {
      const ip = prompt("Enter IP address:");
      const res = await fetch(`/api/ip?ip=${ip}`);
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } else {
      setOutput(`Tool "${tool}" not implemented yet.`);
    }
  };

  return (
    <>
      <div className="background"></div>
      <Header />
      <main className="terminal">
        <Dashboard onToolClick={loadTool} />
        <ToolOutput output={output} />
      </main>
      <Footer />
    </>
  );
}

export default App;

import React, { useState } from 'react';

const tools = [
  { name: 'IP Lookup', key: 'ip' },
  { name: 'WHOIS Lookup', key: 'whois' },
  { name: 'DNS Lookup', key: 'dns' },
  { name: 'Reverse DNS', key: 'reverse' },
  { name: 'Traceroute', key: 'trace' },
  { name: 'Port Scanner', key: 'port' },
  { name: 'BIN Checker', key: 'bin' },
  { name: 'Base64 Encoder/Decoder', key: 'base64' },
  { name: 'Hash Generator', key: 'hash' },
  { name: 'User-Agent Viewer', key: 'ua' },
  { name: 'HTTP Header Viewer', key: 'headers' },
  { name: 'GeoIP Lookup', key: 'geo' },
  { name: 'SQLi Payloads', key: 'sqlilab' }
];

export default function App() {
  const [output, setOutput] = useState('Welcome to Cyber Cat Unkn0wn Toolkit. Choose a tool above.');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode'); // For base64

  const loadTool = async (toolKey) => {
    setOutput('Processing...');
    let payload = { value: input, mode };

    try {
      const res = await fetch(`http://localhost:5000/tool/${toolKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      setOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <div className="background"></div>
      <header>
        <h1 className="glow">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_paw_print.svg" className="logo-img" />
          Cyber Cat Unkn0wn
        </h1>
      </header>

      <main className="terminal">
        <section style={{ marginBottom: '10px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Enter input if needed..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '90%',
              padding: '10px',
              background: 'black',
              color: '#00ff00',
              border: '1px solid #00ff00',
              fontFamily: 'Courier New',
              marginBottom: '10px'
            }}
          />
          {tools.find(t => t.key === 'base64') && (
            <div>
              <label style={{ color: '#00ff00', marginRight: '10px' }}>Base64 Mode:</label>
              <select value={mode} onChange={e => setMode(e.target.value)}>
                <option value="encode">Encode</option>
                <option value="decode">Decode</option>
              </select>
            </div>
          )}
        </section>

        <section className="dashboard">
          {tools.map(tool => (
            <button key={tool.key} onClick={() => loadTool(tool.key)}>
              {tool.name}
            </button>
          ))}
        </section>

        <section id="tool-output">
          <pre>{output}</pre>
        </section>
      </main>

      <footer>
        <p>© Cyber Cat Unkn0wn | For Educational Use Only</p>
        <div className="social-links">
          <a href="https://github.com/XD-MADS-12">GitHub</a> | <a href="#">Twitter</a> | <a href="@Anon_Lucifer44">Telegram</a>
        </div>
      </footer>
    </>
  );
}

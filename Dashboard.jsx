import React from 'react';

function Dashboard({ onToolClick }) {
  const tools = [
    'ip', 'whois', 'dns', 'reverse', 'trace',
    'port', 'bin', 'base64', 'hash', 'ua',
    'headers', 'geo', 'sqlilab'
  ];

  return (
    <section className="dashboard">
      {tools.map(tool => (
        <button key={tool} onClick={() => onToolClick(tool)}>
          {tool.toUpperCase().replace('SQLILAB', 'SQLi Payloads')}
        </button>
      ))}
    </section>
  );
}

export default Dashboard;

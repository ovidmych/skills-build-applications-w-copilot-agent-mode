import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 display-6">Leaderboard</h2>
      <div className="table-responsive mb-4">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}>
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <div className="alert alert-info">No leaderboard data found.</div>}
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {data.slice(0, 4).map((item, idx) => (
          <div className="col" key={item.id || idx}>
            <div className="card h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title">{item.name || item.username || `Entry #${idx + 1}`}</h5>
                <p className="card-text">{Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

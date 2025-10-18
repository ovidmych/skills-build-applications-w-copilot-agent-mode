import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [data, setData] = useState([]);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  const [showForm, setShowForm] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState("");

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь должна быть логика отправки новой тренировки
    setShowForm(false);
    setWorkoutName("");
    setWorkoutDetails("");
  };

  return (
    <div>
      <h2 className="mb-4 display-6">Workouts</h2>
      <div className="mb-3">
        <button className="btn btn-success" onClick={handleShowForm}>Add Workout</button>
      </div>
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
        {data.length === 0 && <div className="alert alert-info">No workouts found.</div>}
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
        {data.slice(0, 4).map((item, idx) => (
          <div className="col" key={item.id || idx}>
            <div className="card h-100 border-success">
              <div className="card-body">
                <h5 className="card-title">{item.name || `Workout #${idx + 1}`}</h5>
                <p className="card-text">{Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bootstrap Form Modal */}
      {showForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Workout</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="workoutName" className="form-label">Workout Name</label>
                    <input type="text" className="form-control" id="workoutName" value={workoutName} onChange={e => setWorkoutName(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutDetails" className="form-label">Details</label>
                    <textarea className="form-control" id="workoutDetails" value={workoutDetails} onChange={e => setWorkoutDetails(e.target.value)} rows="3" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Close</button>
                  <button type="submit" className="btn btn-primary">Save Workout</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;

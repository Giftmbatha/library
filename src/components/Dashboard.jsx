import React, { useState, useEffect } from 'react';

import '../css/dashboard.css'

function Dashboard() {
  const [bookCount, setBookCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);

  useEffect(() => {
    // Fetch total books
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => setBookCount(data.length))
      .catch(error => console.error('Error fetching books:', error));

    // Fetch total members
    fetch('http://localhost:5000/api/members')
      .then(response => response.json())
      .then(data => setMemberCount(data.length))
      .catch(error => console.error('Error fetching members:', error));

    // Fetch total loans
    fetch('http://localhost:5000/api/loans')
      .then(response => response.json())
      .then(data => setLoanCount(data.length))
      .catch(error => console.error('Error fetching loans:', error));
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Total Books</h3>
          <p className="card-value">{bookCount}</p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Total Members</h3>
          <p className="card-value">{memberCount}</p>
        </div>
        <div className="dashboard-card">
          <h3 className="card-title">Books on Loan</h3>
          <p className="card-value">{loanCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
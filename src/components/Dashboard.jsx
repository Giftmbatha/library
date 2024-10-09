import React, { useState, useEffect } from 'react';
import { FaBook, FaUsers, FaExchangeAlt, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function Dashboard() {
  const [bookCount, setBookCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0); // New state for available books

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [booksResponse, membersResponse, loansResponse] = await Promise.all([
          fetch('http://localhost:5000/api/books'),
          fetch('http://localhost:5000/api/members'),
          fetch('http://localhost:5000/api/loans'),
        ]);

        const books = await booksResponse.json();
        const members = await membersResponse.json();
        const loans = await loansResponse.json();

        setBookCount(books.length);
        setMemberCount(members.length);
        setLoanCount(loans.length);
        setCheckedOutCount(loans.length);
        setCheckedInCount(books.length - loans.length);
        setAvailableCount(books.length - loans.length); // Count of available books
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  const DashboardCard = ({ title, value, icon }) => (
    <div className="dashboard-card">
      {icon}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-grid">
        <DashboardCard title="Total Books" value={bookCount} icon={<FaBook className="card-icon" />} />
        <DashboardCard title="Total Members" value={memberCount} icon={<FaUsers className="card-icon" />} />
        <DashboardCard title="Books on Loan" value={loanCount} icon={<FaExchangeAlt className="card-icon" />} />
        <DashboardCard title="Books Checked In" value={checkedInCount} icon={<FaSignInAlt className="card-icon" />} />
        <DashboardCard title="Books Checked Out" value={checkedOutCount} icon={<FaSignOutAlt className="card-icon" />} />
        <DashboardCard title="Available Books" value={availableCount} icon={<FaBook className="card-icon" />} /> {/* New card for available books */}
      </div>
      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;

        }
        .dashboard-title {
          font-size: 2.5rem;
          color: #fff; /* Changed text color for better readability */
          text-align: center;
          margin-bottom: 2rem;
          font-weight: bold;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .dashboard-card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
        }
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .card-icon {
          font-size: 2.5rem;
          color: #3498db;
          margin-right: 1rem;
        }
        .card-content {
          flex-grow: 1;
        }
        .card-title {
          font-size: 1.2rem;
          color: #34495e;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .card-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: #3498db;
          margin: 0;
        }
        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
          }
          .dashboard-title {
            font-size: 2rem;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;

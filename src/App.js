import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaBook, FaUsers, FaExchangeAlt, FaPlus, FaDashcube } from 'react-icons/fa';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import LoanList from './components/LoanList';
import AddLoanForm from './components/AddLoanForm';
import AddBookForm from './components/AddBookForm';
import AddMemberForm from './components/AddMemberForm';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import backgroundImage from './background.jpg';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <h1>Library Management System</h1>
        </header>

        <div className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <nav>
            <Link to="/" onClick={toggleSidebar}>
              <FaHome className="icon" />
              {sidebarOpen && <span>Home</span>}
            </Link>
            <Link to="/dashboard" onClick={toggleSidebar}>
              <FaDashcube className="icon" />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            <Link to="/books" onClick={toggleSidebar}>
              <FaBook className="icon" />
              {sidebarOpen && <span>Books</span>}
            </Link>
            <Link to="/members" onClick={toggleSidebar}>
              <FaUsers className="icon" />
              {sidebarOpen && <span>Members</span>}
            </Link>
            <Link to="/loans" onClick={toggleSidebar}>
              <FaExchangeAlt className="icon" />
              {sidebarOpen && <span>Loans</span>}
            </Link>
            <Link to="/loan" onClick={toggleSidebar}>
              <FaPlus className="icon" />
              {sidebarOpen && <span>Loan a Book</span>}
            </Link>
            <Link to="/book" onClick={toggleSidebar}>
              <FaPlus className="icon" />
              {sidebarOpen && <span>Add a Book</span>}
            </Link>
            <Link to="/member" onClick={toggleSidebar}>
              <FaPlus className="icon" />
              {sidebarOpen && <span>Add a Member</span>}
            </Link>
          </nav>
        </div>

        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/books" element={<BookList />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/loans" element={<LoanList />} />
            <Route path="/loan" element={<AddLoanForm />} />
            <Route path="/book" element={<AddBookForm />} />
            <Route path="/member" element={<AddMemberForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }

        .header {
          background-color: #1a237e;
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          position: fixed;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .header h1 {
          margin-left: 1rem;
          font-size: 1.5rem;
          font-weight: 500;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .sidebar {
          background-color: #303f9f;
          width: 250px;
          position: fixed;
          top: 0;
          left: -250px;
          height: 100%;
          transition: all 0.3s ease;
          z-index: 900;
          padding-top: 60px;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }

        .sidebar.open {
          left: 0;
        }

        .sidebar.collapsed {
          width: 70px;
          left: 0;
        }

        .sidebar nav a {
          color: white;
          text-decoration: none;
          padding: 0.75rem 1rem;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .sidebar nav a:hover {
          background-color: #3949ab;
        }

        .icon {
          font-size: 1.2em;
          margin-right: 10px;
        }

        .collapsed .icon {
          margin-right: 0;
        }

        .collapsed span {
          display: none;
        }

        .main-content {
          flex-grow: 1;
          padding: 2rem;
          margin-top: 60px;
          transition: margin-left 0.3s ease;
         
          margin: 80px 20px 20px;
        }

        .main-content.sidebar-open {
          margin-left: 270px;
        }

        @media (max-width: 767px) {
          .main-content.sidebar-open {
            margin-left: 20px;
          }
        }
      `}</style>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import LoanList from './components/LoanList';
import AddLoanForm from './components/AddLoanForm';
import AddBookForm from './components/AddBookForm';
import AddMemberForm from './components/AddMemberForm';
import Home from './components/Home';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <h1>Library Management System</h1>
        </header>

        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav>
            <Link to="/" onClick={toggleSidebar}><span className="icon">🏠</span> Home</Link>
            <Link to="/books" onClick={toggleSidebar}><span className="icon">📚</span> Books</Link>
            <Link to="/members" onClick={toggleSidebar}><span className="icon">👥</span> Members</Link>
            <Link to="/loans" onClick={toggleSidebar}><span className="icon">📖</span> Loans</Link>
            <Link to="/loan" onClick={toggleSidebar}><span className="icon">➕📖</span> Loan a Book</Link>
            <Link to="/book" onClick={toggleSidebar}><span className="icon">➕📚</span> Add a Book</Link>
            <Link to="/member" onClick={toggleSidebar}><span className="icon">➕👤</span> Add a Member</Link>
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

        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .header {
          background-color: #2c3e50;
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          position: fixed;
          width: 100%;
          z-index: 1000;
        }

        .header h1 {
          margin-left: 1rem;
          font-size: 1.5rem;
        }

        .menu-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .sidebar {
          background-color: #34495e;
          width: 250px;
          position: fixed;
          top: 0;
          left: -250px;
          height: 100%;
          transition: left 0.3s ease;
          z-index: 900;
          padding-top: 60px;
        }

        .sidebar.open {
          left: 0;
        }

        .sidebar nav {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .sidebar nav a {
          color: white;
          text-decoration: none;
          padding: 0.5rem 0;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .sidebar nav a:hover {
          background-color: #2c3e50;
        }

        .icon {
          margin-right: 10px;
          font-size: 1.2em;
        }

        .main-content {
          flex-grow: 1;
          padding: 2rem;
          margin-top: 60px;
          transition: margin-left 0.3s ease;
        }

        .main-content.sidebar-open {
          margin-left: 250px;
        }

        @media (min-width: 768px) {
          .header {
            padding: 1rem 2rem;
          }

          .menu-toggle {
            display: none;
          }

          .sidebar {
            left: 0;
          }

          .main-content {
            margin-left: 250px;
          }
        }

        @media (max-width: 767px) {
          .main-content.sidebar-open {
            margin-left: 0;
          }
        }
      `}</style>
    </Router>
  );
}

export default App;





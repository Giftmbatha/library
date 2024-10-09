import React, { useState, useEffect } from 'react';

function LoanList() {
  const [loans, setLoans] = useState([]);
  const [members, setMembers] = useState({});
  const [books, setBooks] = useState({});

  useEffect(() => {
    fetchLoans();
    fetchMembers();
    fetchBooks();
  }, []);

  const fetchLoans = () => {
    fetch('http://localhost:5000/api/loans')
      .then(response => response.json())
      .then(data => setLoans(data))
      .catch(error => console.error('Error fetching loans:', error));
  };

  const fetchMembers = () => {
    fetch('http://localhost:5000/api/members')
      .then(response => response.json())
      .then(data => {
        const memberMap = {};
        data.forEach(member => {
          memberMap[member.MemberID] = member.MemberName;
        });
        setMembers(memberMap);
      })
      .catch(error => console.error('Error fetching members:', error));
  };

  const fetchBooks = () => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => {
        const bookMap = {};
        data.forEach(book => {
          bookMap[book.BookID] = book.Title;
        });
        setBooks(bookMap);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  return (
    <div className="loan-list">
      <h2>Loan List</h2>
      <div className="loan-grid">
        {loans.map(loan => (
          <div key={loan.LoanID} className="loan-card">
            <div className="loan-header">
              <h3>Loan ID: {loan.LoanID}</h3>
            </div>
            <div className="loan-content">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                Book: {books[loan.BookID] || 'Unknown'}
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Member: {members[loan.MemberID] || 'Unknown'}
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Checkout Date: {new Date(loan.CheckoutDate).toLocaleDateString()}
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M16 18h.01"></path>
                </svg>
                Return Date: {new Date(loan.ReturnDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .loan-list {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          color: #ffff;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: bold;
        }

        .loan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .loan-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .loan-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .loan-header {
          background-color: #3f51b5;
          color: white;
          padding: 1rem;
        }

        .loan-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .loan-content {
          padding: 1rem;
        }

        .loan-content p {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #333;
        }

        .loan-content svg {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.5rem;
          color: #3f51b5;
        }

        @media (max-width: 768px) {
          .loan-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default LoanList;
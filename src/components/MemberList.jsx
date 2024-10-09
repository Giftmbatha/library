import React, { useState, useEffect } from 'react';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    fetch('http://localhost:5000/api/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => {
        console.error('Error fetching members:', error);
        setAlert({ type: 'error', message: 'Failed to fetch members. Please try again.' });
      });
  };

  const handleEdit = (member) => {
    setEditingMember({ ...member });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/members/${editingMember.MemberID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingMember),
    })
      .then(response => response.json())
      .then(updatedMember => {
        setMembers(members.map(m => m.MemberID === updatedMember.MemberID ? updatedMember : m));
        setEditingMember(null);
        setAlert({ type: 'success', message: 'Member updated successfully.' });
      })
      .catch(error => {
        console.error('Error updating member:', error);
        setAlert({ type: 'error', message: 'Failed to update member. Please try again.' });
      });
  };

  const handleDelete = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      fetch(`http://localhost:5000/api/members/${memberId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setMembers(members.filter(m => m.MemberID !== memberId));
          setAlert({ type: 'success', message: 'Member deleted successfully.' });
        })
        .catch(error => {
          console.error('Error deleting member:', error);
          setAlert({ type: 'error', message: 'Failed to delete member. Please try again.' });
        });
    }
  };

  const handleChange = (e) => {
    setEditingMember({ ...editingMember, [e.target.name]: e.target.value });
  };

  const filteredMembers = members.filter(member =>
    member.MemberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.MemberAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="member-list">
      <h2>Member List</h2>
      
      {alert && (
        <div className={`alert ${alert.type}`}>
          <strong>{alert.type === 'error' ? 'Error' : 'Success'}</strong>
          <p>{alert.message}</p>
        </div>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <div className="member-grid">
        {filteredMembers.map(member => (
          <div key={member.MemberID} className="member-card">
            <div className="member-header">
              {editingMember && editingMember.MemberID === member.MemberID ? (
                <input
                  name="MemberName"
                  value={editingMember.MemberName}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <h3>{member.MemberName}</h3>
              )}
            </div>
            <div className="member-content">
              {editingMember && editingMember.MemberID === member.MemberID ? (
                <div className="edit-form">
                  <input
                    name="MemberAddress"
                    value={editingMember.MemberAddress}
                    onChange={handleChange}
                    placeholder="Address"
                    className="edit-input"
                  />
                  <div className="button-group">
                    <button onClick={handleSave} className="save-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save
                    </button>
                    <button onClick={() => setEditingMember(null)} className="cancel-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="member-id">Member ID: {member.MemberID}</p>
                  <p className="member-address">{member.MemberAddress}</p>
                  <div className="button-group">
                    <button onClick={() => handleEdit(member)} className="edit-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(member.MemberID)} className="delete-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .member-list {
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

        .alert {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .alert.error {
          background-color: #ffe6e6;
          border: 1px solid #ff9999;
          color: #cc0000;
        }

        .alert.success {
          background-color: #e6ffe6;
          border: 1px solid #99ff99;
          color: #006600;
        }

        .search-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.2rem;
          height: 1.2rem;
          color: #888;
        }

        .member-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .member-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .member-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .member-header {
          background-color: #3f51b5;
          color: white;
          padding: 1rem;
        }

        .member-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .member-content {
          padding: 1rem;
        }

        .member-id {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .member-address {
          font-size: 1rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        button svg {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .edit-btn {
          background-color: #2196F3;
          color: white;
        }

        .delete-btn {
          background-color: #f44336;
          color: white;
        }

        .save-btn {
          background-color: #4CAF50;
          color: white;
        }

        .cancel-btn {
          background-color: #9e9e9e;
          color: white;
        }

        button:hover {
          opacity: 0.9;
        }

        .edit-input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .member-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default MemberList;
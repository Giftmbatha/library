import React, { useState, useEffect } from 'react';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

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
      })
      .catch(error => console.error('Error updating member:', error));
  };

  const handleDelete = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      fetch(`http://localhost:5000/api/members/${memberId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setMembers(members.filter(m => m.MemberID !== memberId));
        })
        .catch(error => console.error('Error deleting member:', error));
    }
  };

  const handleChange = (e) => {
    setEditingMember({ ...editingMember, [e.target.name]: e.target.value });
  };

  return (
    <div className="member-list">
      <h2>Member List</h2>
      <div className="member-grid">
        {members.map(member => (
          <div key={member.MemberID} className="member-card">
            {editingMember && editingMember.MemberID === member.MemberID ? (
              <div className="member-edit">
                <input
                  name="MemberName"
                  value={editingMember.MemberName}
                  onChange={handleChange}
                />
                <input
                  name="MemberAddress"
                  value={editingMember.MemberAddress}
                  onChange={handleChange}
                />
                <div className="button-group">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingMember(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3>{member.MemberName}</h3>
                <p>Member ID: {member.MemberID}</p>
                <p>Address: {member.MemberAddress}</p>
                <div className="button-group">
                  <button onClick={() => handleEdit(member)}>Edit</button>
                  <button onClick={() => handleDelete(member.MemberID)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .member-list {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .member-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .member-card {
          background-color: #e0f7fa;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .member-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        h3 {
          margin: 0 0 1rem;
          color: #1565c0;
        }

        p {
          margin: 0.5rem 0;
          color: #555;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        button {
          background-color: #2196f3;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #1565c0;
        }

        .member-edit {
          display: flex;
          flex-direction: column;
        }

        input {
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        @media (max-width: 600px) {
          .member-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default MemberList;
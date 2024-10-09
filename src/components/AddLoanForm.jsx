import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Select, MenuItem, FormControl, InputLabel, Typography, InputAdornment } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

function AddLoanForm() {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));

    axios.get('http://localhost:5000/api/members')
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/loans', { BookID: bookId, MemberID: memberId, ReturnDate: returnDate, CheckoutDate: checkoutDate })
      .then(() => {
        setMessage({ type: 'success', text: 'Loan added successfully' });
        setBookId('');
        setMemberId('');
        setCheckoutDate('');
        setReturnDate('');
      })
      .catch(() => setMessage({ type: 'error', text: 'Error adding loan. Please try again.' }));
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '500px' }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h4" gutterBottom align="center" style={{ color: '#333', fontWeight: 'bold' }}>
          Add New Loan
        </Typography>
        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormControl fullWidth required>
            <InputLabel id="book-label">Select a Book</InputLabel>
            <Select
              labelId="book-label"
              value={bookId}
              onChange={e => setBookId(e.target.value)}
              label="Select a Book"
              startAdornment={
                <InputAdornment position="start">
                  <BookIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {books.map(book => (
                <MenuItem key={book.BookID} value={book.BookID}>{book.Title}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="member-label">Select a Member</InputLabel>
            <Select
              labelId="member-label"
              value={memberId}
              onChange={e => setMemberId(e.target.value)}
              label="Select a Member"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {members.map(member => (
                <MenuItem key={member.MemberID} value={member.MemberID}>{member.MemberName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Checkout Date"
            type="date"
            value={checkoutDate}
            onChange={e => setCheckoutDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            required
          />
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            required
          />

          <Button type="submit" variant="contained" color="primary" style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px' }}>
            Add Loan
          </Button>
        </form>

        <style jsx>{`
          .message {
            padding: 0.75rem;
            border-radius: 4px;
            margin-top: 1rem;
            text-align: center;
            font-size: 0.9rem;
          }

          .message.success {
            background-color: #d4edda;
            color: #155724;
          }

          .message.error {
            background-color: #f8d7da;
            color: #721c24;
          }
        `}</style>
      </div>
    </Container>
  );
}

export default AddLoanForm;

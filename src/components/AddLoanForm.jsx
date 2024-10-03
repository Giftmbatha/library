import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

function AddLoanForm() {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

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
      .then(response => {
        console.log('Loan added successfully');
        setBookId('');
        setMemberId('');
        setCheckoutDate('');
      })
      .catch(error => console.error('Error adding loan:', error));
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '500px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Add New Loan
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormControl fullWidth required>
          <InputLabel id="book-label">Select a Book</InputLabel>
          <Select
            labelId="book-label"
            value={bookId}
            onChange={e => setBookId(e.target.value)}
            label="Select a Book"
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
          fullWidth
          required
        />
         <TextField
          label="Return Date"
          type="date"
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Add Loan
        </Button>
      </form>
    </Container>
  );
}

export default AddLoanForm;

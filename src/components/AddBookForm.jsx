import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/books', { Title: title, Author: author, ISBN: isbn })
      .then(response => {
        console.log('Book added successfully');
        setTitle('');
        setAuthor('');
        setIsbn('');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '400px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Add New Book
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="ISBN"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </form>
    </Container>
  );
}

export default AddBookForm;

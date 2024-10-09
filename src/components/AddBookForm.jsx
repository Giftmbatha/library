import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, InputAdornment } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/books', { Title: title, Author: author, ISBN: isbn })
      .then(() => {
        setMessage({ type: 'success', text: 'Book added successfully' });
        setTitle('');
        setAuthor('');
        setIsbn('');
      })
      .catch(() => setMessage({ type: 'error', text: 'Error adding book. Please try again.' }));
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '400px' }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h4" gutterBottom align="center" style={{ color: '#333', fontWeight: 'bold' }}>
          Add New Book
        </Typography>
        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BookIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="ISBN"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CodeIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px' }}>
            Add Book
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

export default AddBookForm;

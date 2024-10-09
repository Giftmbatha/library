import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Home from '@mui/icons-material/Home';

function AddMemberForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/members', { MemberName: name, MemberAddress: address })
      .then(response => {
        console.log('Member added successfully');
        setName('');
        setAddress('');
      })
      .catch(error => console.error('Error adding member:', error));
  };

  return (
    <Container style={{ marginTop: '2rem', maxWidth: '400px', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#333' }}>
        Add New Member
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ padding: '0.75rem', fontSize: '1rem', fontWeight: '600' }}>
          Add Member
        </Button>
      </form>
    </Container>
  );
}

export default AddMemberForm;


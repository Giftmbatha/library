import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

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
    <Container style={{ marginTop: '2rem', maxWidth: '400px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Add New Member
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Member
        </Button>
      </form>
    </Container>
  );
}

export default AddMemberForm;

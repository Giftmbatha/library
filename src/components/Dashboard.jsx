import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';

function Dashboard() {
  const [bookCount, setBookCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);

  useEffect(() => {
    // Fetch total books
    axios.get('http://localhost:5000/api/books')
      .then(response => setBookCount(response.data.length))
      .catch(error => console.error('Error fetching books:', error));

    // Fetch total members
    axios.get('http://localhost:5000/api/members')
      .then(response => setMemberCount(response.data.length))
      .catch(error => console.error('Error fetching members:', error));

    // Fetch total loans
    axios.get('http://localhost:5000/api/loans')
      .then(response => setLoanCount(response.data.length))
      .catch(error => console.error('Error fetching loans:', error));
  }, []);

  return (
    <Grid container spacing={4} style={{ marginTop: '2rem' }}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Typography variant="h6">Total Books</Typography>
          <Typography variant="h4" color="primary">{bookCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Typography variant="h6">Total Members</Typography>
          <Typography variant="h4" color="primary">{memberCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Typography variant="h6">Books on Loan</Typography>
          <Typography variant="h4" color="primary">{loanCount}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

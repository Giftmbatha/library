import React from 'react';
import { Box, Typography } from '@mui/material';
import Dashboard from './Dashboard';

function Home() {
  return (
    <Box textAlign="center" style={{ marginTop: '3rem' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Library Management System
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Manage your library's books, members, and loans with ease.
      </Typography>
      <Dashboard />
    </Box>
  );
}

export default Home;

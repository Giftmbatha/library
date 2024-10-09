import React from 'react';
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Book, People, SwapHoriz } from '@mui/icons-material';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  fontWeight:'bold',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Home() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="white" fontWeight="bold">
        Welcome to the Library Management System
      </Typography>
      <Typography variant="h6" align="center" color="white" fontWeight="bold" paragraph>
        Manage your library's books, members, and loans with ease.
      </Typography>
      
      <Grid container spacing={3} sx={{ marginTop: 4, marginBottom: 4 }}>
        <Grid item xs={12} sm={4}>
          <StyledPaper elevation={3}>
            <IconWrapper size="large" aria-label="books">
              <Book fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
              Manage Books
            </Typography>
            <Typography>
              Add, edit, and organize your library's book collection.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledPaper elevation={3}>
            <IconWrapper size="large" aria-label="members">
              <People fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
              Manage Members
            </Typography>
            <Typography>
              Keep track of library members and their information.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledPaper elevation={3}>
            <IconWrapper size="large" aria-label="loans">
              <SwapHoriz fontSize="large" />
            </IconWrapper>
            <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
              Manage Loans
            </Typography>
            <Typography>
              Handle book loans, returns, and track due dates.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>

     
    </Box>
  );
}

export default Home;

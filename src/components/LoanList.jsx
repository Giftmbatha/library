import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, Container } from '@mui/material';

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/loans')
      .then(response => setLoans(response.data))
      .catch(error => console.error('Error fetching loans:', error));
  }, []);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center">
        Loan List
      </Typography>
      <Grid container spacing={3}>
        {loans.map(loan => (
          <Grid item xs={12} sm={6} md={4} key={loan.LoanID}>
            <Card style={{ backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Loan ID: {loan.LoanID}
                </Typography>
                <Typography color="textSecondary">
                  Book ID: {loan.BookID}
                </Typography>
                <Typography color="textSecondary">
                  Member ID: {loan.MemberID}
                </Typography>
                <Typography color="textSecondary">
                  Checkout Date: {new Date(loan.CheckoutDate).toLocaleDateString()}
                </Typography>
                <Typography color="textSecondary">
                  Return Date: {new Date(loan.ReturnDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default LoanList;

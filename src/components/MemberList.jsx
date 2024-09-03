import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid, Container } from '@mui/material';

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center">
        Member List
      </Typography>
      <Grid container spacing={3}>
        {members.map(member => (
          <Grid item xs={12} sm={6} md={4} key={member.MemberID}>
            <Card style={{ backgroundColor: '#e0f7fa', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.MemberName}
                </Typography>
                <Typography color="textSecondary">
                  Member ID: {member.MemberID}
                </Typography>
                <Typography color="textSecondary">
                  Name: {member.MemberName}
                </Typography>
                <Typography color="textSecondary">
                  Address: {member.MemberAddress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MemberList;

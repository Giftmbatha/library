import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Button, Container } from '@mui/material';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import LoanList from './components/LoanList';
import AddLoanForm from './components/AddLoanForm';
import AddBookForm from './components/AddBookForm';
import AddMemberForm from './components/AddMemberForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Library Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/books">Books</Button>
          <Button color="inherit" component={Link} to="/members">Members</Button>
          <Button color="inherit" component={Link} to="/loans">Loans</Button>
          <Button color="inherit" component={Link} to="/loan">Loan a Book</Button>
          <Button color="inherit" component={Link} to="/book">Add a Book</Button>
          <Button color="inherit" component={Link} to="/member">Add a Member</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/loans" element={<LoanList />} />
          <Route path="/loan" element={<AddLoanForm />} />
          <Route path="/book" element={<AddBookForm />} />
          <Route path="/member" element={<AddMemberForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;





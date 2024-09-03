const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library_management_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Book routes
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post('/api/books', (req, res) => {
  const { Title, Author, ISBN } = req.body;
  db.query('INSERT INTO Books (Title, Author, ISBN) VALUES (?, ?, ?)', [Title, Author, ISBN], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId, message: 'Book added successfully' });
  });
});

// Member routes
app.get('/api/members', (req, res) => {
  db.query('SELECT * FROM Members', (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post('/api/members', (req, res) => {
  const { MemberName, MemberAddress } = req.body;
  db.query('INSERT INTO Members (MemberName, MemberAddress) VALUES (?, ?)', [MemberName, MemberAddress], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId, message: 'Member added successfully' });
  });
});

// Loan routes
app.get('/api/loans', (req, res) => {
  db.query('SELECT * FROM Loans', (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

app.post('/api/loans', (req, res) => {
  const { BookID, MemberID, CheckoutDate } = req.body;
  db.query('INSERT INTO Loans (BookID, MemberID, CheckoutDate) VALUES (?, ?, ?)', [BookID, MemberID, CheckoutDate], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: result.insertId, message: 'Loan recorded successfully' });
  });
});

// Update server.js to include new routes
app.put('/api/books/:id', (req, res) => {
  const { Title, Author, ISBN } = req.body;
  db.query('UPDATE Books SET Title = ?, Author = ?, ISBN = ? WHERE BookID = ?', 
    [Title, Author, ISBN, req.params.id], 
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: 'Book updated successfully' });
    }
  );
});

app.delete('/api/books/:id', (req, res) => {
  db.query('DELETE FROM Books WHERE BookID = ?', [req.params.id], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: 'Book deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
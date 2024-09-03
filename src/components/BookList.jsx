import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Typography,Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination, IconButton, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:5000/api/books/${bookToDelete.BookID}`)
      .then(() => {
        setBooks(books.filter(book => book.BookID !== bookToDelete.BookID));
        setOpenDeleteDialog(false);
        setBookToDelete(null);
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setBookToDelete(null);
  };

 const handleEditClick = (book) => {
  navigate(`/edit-book/${book.BookID}`);
};

  const filteredBooks = books.filter(book =>
    book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      <TextField
        label="Search books"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(book => (
                <TableRow key={book.BookID}>
                  <TableCell>{book.Title}</TableCell>
                  <TableCell>{book.Author}</TableCell>
                  <TableCell>{book.ISBN}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditClick(book)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(book)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the book titled "{bookToDelete?.Title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookList;

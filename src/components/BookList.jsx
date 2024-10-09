import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaSave, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      fetch(`http://localhost:5000/api/books/${bookId}`, { method: 'DELETE' })
        .then(() => {
          setBooks(books.filter(book => book.BookID !== bookId));
        })
        .catch(error => console.error('Error deleting book:', error));
    }
  };

  const handleEdit = (book) => {
    setEditingBook({ ...book });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/books/${editingBook.BookID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBook),
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(books.map(book => book.BookID === updatedBook.BookID ? updatedBook : book));
        setEditingBook(null);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  const handleChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  const filteredBooks = books.filter(book =>
    book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map(book => (
              <tr key={book.BookID}>
                <td>
                  {editingBook && editingBook.BookID === book.BookID ? 
                    <input name="Title" value={editingBook.Title} onChange={handleChange} /> : 
                    book.Title
                  }
                </td>
                <td>
                  {editingBook && editingBook.BookID === book.BookID ? 
                    <input name="Author" value={editingBook.Author} onChange={handleChange} /> : 
                    book.Author
                  }
                </td>
                <td>
                  {editingBook && editingBook.BookID === book.BookID ? 
                    <input name="ISBN" value={editingBook.ISBN} onChange={handleChange} /> : 
                    book.ISBN
                  }
                </td>
                <td>
                  {editingBook && editingBook.BookID === book.BookID ? (
                    <>
                      <button onClick={handleSave} className="save-btn"><FaSave /> Save</button>
                      <button onClick={() => setEditingBook(null)} className="cancel-btn"><FaTimes /> Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(book)} className="edit-btn"><FaEdit /> Edit</button>
                      <button onClick={() => handleDelete(book.BookID)} className="delete-btn"><FaTrash /> Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="page-btn"
        >
          <FaChevronLeft /> Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {Math.ceil(filteredBooks.length / booksPerPage)}
        </span>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(filteredBooks.length / booksPerPage)}
          className="page-btn"
        >
          Next <FaChevronRight />
        </button>
      </div>

      <style jsx>{`
        .book-list {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Roboto', Arial, sans-serif;
          
        }

        h2 {
          text-align: center;
          color: #ffff;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: bold;
        }

        .search-container {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          font-size: 1rem;
          border: 1px solid #bdc3c7;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3498db;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #7f8c8d;
        }

        .table-container {
          overflow-x: auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ecf0f1;
        }

        th {
          background-color:#3f51b5;
          color: #fff;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.85rem;
        }

        tr:hover {
          background-color: #f5f7fa;
        }

        button {
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.1s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        button:hover {
          transform: translateY(-1px);
        }

        button:active {
          transform: translateY(0);
        }

        .edit-btn {
          background-color: #2ecc71;
          color: white;
        }

        .delete-btn {
          background-color: #e74c3c;
          color: white;
        }

        .save-btn {
          background-color: #3498db;
          color: white;
        }

        .cancel-btn {
          background-color: #95a5a6;
          color: white;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
        }

        .page-btn {
          background-color: #3498db;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .page-btn:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }

        .page-info {
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #bdc3c7;
          border-radius: 4px;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .book-list {
            padding: 1rem;
          }

          th, td {
            padding: 0.75rem 0.5rem;
          }

          .pagination {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .page-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default BookList;
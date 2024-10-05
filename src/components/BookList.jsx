import React, { useState, useEffect } from 'react';

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
      <input
        type="text"
        placeholder="Search books"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
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
              <td>{editingBook && editingBook.BookID === book.BookID ? 
                <input name="Title" value={editingBook.Title} onChange={handleChange} /> : 
                book.Title}
              </td>
              <td>{editingBook && editingBook.BookID === book.BookID ? 
                <input name="Author" value={editingBook.Author} onChange={handleChange} /> : 
                book.Author}
              </td>
              <td>{editingBook && editingBook.BookID === book.BookID ? 
                <input name="ISBN" value={editingBook.ISBN} onChange={handleChange} /> : 
                book.ISBN}
              </td>
              <td>
                {editingBook && editingBook.BookID === book.BookID ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingBook(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(book)}>Edit</button>
                    <button onClick={() => handleDelete(book.BookID)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>

      <style jsx>{`
        .book-list {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .search-input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        tr:hover {
          background-color: #f5f5f5;
        }

        button {
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          opacity: 0.8;
        }

        button:first-child {
          background-color: #4CAF50;
          color: white;
        }

        button:last-child {
          background-color: #f44336;
          color: white;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .pagination button {
          margin: 0 0.25rem;
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          background-color: #fff;
          color: #333;
        }

        .pagination button.active {
          background-color: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          table, tr, td {
            display: block;
          }

          tr {
            margin-bottom: 1rem;
          }

          td {
            border: none;
            position: relative;
            padding-left: 50%;
          }

          td:before {
            content: attr(data-label);
            position: absolute;
            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: bold;
          }

          th {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default BookList;
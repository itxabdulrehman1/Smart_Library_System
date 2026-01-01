import React from 'react';

const BookList = ({ books, deleteBook }) => {
  if (books.length === 0) {
    return <p style={{ textAlign: 'center' }}>No books available in the library.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book._id} className="book-card">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn} | <strong>Year:</strong> {book.year}</p>
          </div>
          {/* Delete Button (Task 1b-3) */}
          <button 
            className="delete-btn" 
            onClick={() => deleteBook(book._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
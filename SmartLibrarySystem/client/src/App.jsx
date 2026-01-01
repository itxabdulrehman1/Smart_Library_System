import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '', author: '', isbn: '', year: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books from server.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to add book');

      const newBook = await response.json();
      
      setBooks([...books, newBook]);
      setFormData({ title: '', author: '', isbn: '', year: '' }); 
      setError('');
    } catch (err) {
      setError("Failed to add book. Please try again.");
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete');

      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      setError("Failed to delete book.");
    }
  };

  return (
    <div className="container">
      <h1>📚 Smart Library System</h1>
      
      {/* Error Message Display (Task 3-2) */}
      {error && <p className="error-msg">{error}</p>}

      {/* Book Entry Component (Task 1a-1) */}
      <BookForm 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
      />

      {/* Book List Component (Task 1a-2) */}
      <BookList 
        books={books} 
        deleteBook={deleteBook} 
      />
    </div>
  );
}

export default App;
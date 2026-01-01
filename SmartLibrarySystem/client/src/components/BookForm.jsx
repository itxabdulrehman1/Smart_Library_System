import React from 'react';

const BookForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        placeholder="Book Title" 
        value={formData.title} 
        onChange={handleInputChange} 
        required 
      />
      <input 
        type="text" 
        name="author" 
        placeholder="Author Name" 
        value={formData.author} 
        onChange={handleInputChange} 
        required 
      />
      <input 
        type="text" 
        name="isbn" 
        placeholder="ISBN Number" 
        value={formData.isbn} 
        onChange={handleInputChange} 
        required 
      />
      <input 
        type="number" 
        name="year" 
        placeholder="Publication Year" 
        value={formData.year} 
        onChange={handleInputChange} 
        required 
      />
      <button type="submit" className="add-btn">Add Book</button>
    </form>
  );
};

export default BookForm;
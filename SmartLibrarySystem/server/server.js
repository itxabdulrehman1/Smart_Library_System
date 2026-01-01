const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 


mongoose.connect('mongodb://127.0.0.1:27017/smartlibrary')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    year: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);


app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books", error: error.message });
    }
});

app.post('/api/books', async (req, res) => {
    try {
        const { title, author, isbn, year } = req.body;
        
        if (!title || !author || !isbn || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({ title, author, isbn, year });
        await newBook.save();
        
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Failed to add book", error: error.message });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete book", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
import { Request, Response } from 'express';
import Book from '../models/Book';
import { BookInput, BorrowBookInput } from '../types/book';

// Add a new book to the database
export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookData: BookInput = req.body;
    const book = await Book.create(bookData);
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error (ISBN)
      res.status(400).json({
        success: false,
        error: 'Book with this ISBN already exists'
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Get all books with optional filtering
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Add filter for available books if query param is provided
    const filter: { available?: boolean } = {};
    
    if (req.query.available === 'true') {
      filter.available = true;
    } else if (req.query.available === 'false') {
      filter.available = false;
    }

    const books = await Book.find(filter);
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Fetch a specific book by ID
export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({
        success: false,
        error: 'Book not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Handle book borrowing process
export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { borrower } = req.body as BorrowBookInput;

    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({
        success: false,
        error: 'Book not found'
      });
      return;
    }

    if (!book.available) {
      res.status(400).json({
        success: false,
        error: 'Book is already borrowed'
      });
      return;
    }

    // Update book status
    book.available = false;
    book.borrower = borrower;
    book.borrowDate = new Date();
    book.returnDate = null;

    await book.save();

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Process book return
export const returnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({
        success: false,
        error: 'Book not found'
      });
      return;
    }

    if (book.available) {
      res.status(400).json({
        success: false,
        error: 'Book is not currently borrowed'
      });
      return;
    }

    // Update book status
    book.available = true;
    book.returnDate = new Date();

    await book.save();

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

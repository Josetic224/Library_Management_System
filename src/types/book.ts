import { Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publishedYear?: number;
  genre?: string;
  available: boolean;
  borrower: string | null;
  borrowDate: Date | null;
  returnDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookInput {
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publishedYear?: number;
  genre?: string;
  available?: boolean;
}

export interface BorrowBookInput {
  borrower: string;
}

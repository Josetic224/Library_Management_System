import mongoose, { Schema } from 'mongoose';
import { IBook } from '../types/book';

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true
    },
    isbn: {
      type: String,
      required: [true, 'Please add an ISBN'],
      unique: true,
      trim: true
    },
    publisher: {
      type: String,
      trim: true
    },
    publishedYear: {
      type: Number
    },
    genre: {
      type: String,
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    },
    borrower: {
      type: String,
      default: null
    },
    borrowDate: {
      type: Date,
      default: null
    },
    returnDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBook>('Book', BookSchema);

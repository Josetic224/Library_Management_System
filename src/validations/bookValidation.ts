import { z } from 'zod';

// Book validation schema with TypeScript integration
export const bookSchema = z.object({
  title: z.string({ required_error: "Title is required" })
    .min(1, "Title can't be empty")
    .max(100, "Title is too long - max 100 chars"),
  
  author: z.string()
    .min(1, "Please provide author name")
    .nonempty("Author field can't be empty"),
  
  // ISBN validation
  isbn: z.string({
    required_error: "Missing ISBN number",
  }).min(1, "Enter a valid ISBN"),
  
  publisher: z.string().optional(),
  
  publishedYear: z.number({
    invalid_type_error: "Published year must be a number"
  }).int("Published year must be an integer")
    .min(1000, "Invalid published year")
    .max(new Date().getFullYear(), "Published year cannot be in the future")
    .optional(),
  
  genre: z.string().optional(),
  
  available: z.boolean().optional().default(true)
});

// Schema for borrowing a book
export const borrowBookSchema = z.object({
  borrower: z.string({
    required_error: "Borrower name is required",
    invalid_type_error: "Borrower name must be a string"
  }).min(1, "Borrower name cannot be empty")
});

// Schema for returning a book - no body required
export const returnBookSchema = z.object({});

// Validate book ID parameter
export const bookIdSchema = z.object({
  id: z.string({
    required_error: "Book ID is required",
    invalid_type_error: "Book ID must be a string"
  }).min(1, "Book ID cannot be empty")
});

// Type exports for TypeScript
export type BookInput = z.infer<typeof bookSchema>;
export type BorrowBookInput = z.infer<typeof borrowBookSchema>;
export type BookId = z.infer<typeof bookIdSchema>;

import express from 'express';
import {
  addBook,
  getAllBooks,
  getBook,
  borrowBook,
  returnBook
} from '../controllers/bookController';
import validate from '../middleware/validate';
import {
  bookSchema,
  borrowBookSchema,
  bookIdSchema
} from '../validations/bookValidation';

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', validate(bookSchema), addBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: available
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter books by availability
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookResponse'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/:id', validate(bookIdSchema, 'params'), getBook);

/**
 * @swagger
 * /api/books/{id}/borrow:
 *   put:
 *     summary: Borrow a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - borrower
 *             properties:
 *               borrower:
 *                 type: string
 *                 description: Name of the person borrowing the book
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookResponse'
 *       400:
 *         description: Book already borrowed or invalid request
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/:id/borrow', validate(bookIdSchema, 'params'), validate(borrowBookSchema), borrowBook);

/**
 * @swagger
 * /api/books/{id}/return:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookResponse'
 *       400:
 *         description: Book is not borrowed
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/:id/return', validate(bookIdSchema, 'params'), returnBook);

export default router;

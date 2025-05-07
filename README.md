# Library Management System API (TypeScript)

A RESTful API for a library management system built with TypeScript, Node.js, Express, and MongoDB.

## Features

- Add new books to the library
- View all available books
- Borrow books
- Return books
- Swagger API documentation
- TypeScript for type safety and better developer experience

## Tech Stack

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose ORM
- Swagger UI for API documentation
- Zod for runtime validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- TypeScript knowledge

## Installation

1. Clone the repository or download the source code

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   - Copy the `.env.example` file to `.env`
   - Update the MongoDB connection string and other settings as needed
   ```
   cp .env.example .env
   ```

4. Build the TypeScript code
   ```
   npm run build
   ```

5. Start the development server
   ```
   npm run dev
   ```

6. For production
   ```
   npm start
   ```

## API Endpoints

| Method | Endpoint            | Description                 |
|--------|---------------------|-----------------------------|
| POST   | /api/books          | Add a new book              |
| GET    | /api/books          | Retrieve all books          |
| GET    | /api/books?available=true | Get only available books    |
| GET    | /api/books/:id      | Get a specific book by ID   |
| PUT    | /api/books/:id/borrow | Borrow a book              |
| PUT    | /api/books/:id/return | Return a borrowed book     |

## API Documentation

The API is documented using Swagger. After starting the server, you can access the Swagger UI at:

```
http://localhost:3000/api-docs
```

## Sample API Requests

### Adding a Book

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "publisher": "Scribner",
    "publishedYear": 1925,
    "genre": "Classic Fiction"
  }'
```

### Borrowing a Book

```bash
curl -X PUT http://localhost:3000/api/books/[book_id]/borrow \
  -H "Content-Type: application/json" \
  -d '{
    "borrower": "John Doe"
  }'
```

### Returning a Book

```bash
curl -X PUT http://localhost:3000/api/books/[book_id]/return
```

## TypeScript Benefits

This version of the project leverages TypeScript to provide:

1. **Static typing**: Catch errors at compile time rather than runtime
2. **Better IDE support**: Enhanced autocomplete and type hints
3. **Improved maintainability**: Type definitions serve as documentation
4. **Safer refactoring**: Type checking prevents breaking changes

## Project Structure

```
src/
├── config/           # Configuration files
│   └── db.ts         # Database connection
├── controllers/      # Request handlers
│   └── bookController.ts
├── middleware/       # Custom middleware
│   └── validate.ts
├── models/           # MongoDB models
│   └── Book.ts
├── routes/           # API routes
│   └── bookRoutes.ts
├── swagger/          # API documentation
│   └── swagger.ts
├── types/            # TypeScript type definitions
│   └── book.ts
├── validations/      # Input validation with Zod
│   └── bookValidation.ts
├── app.ts            # Express app setup
└── server.ts         # Application entry point
```

## Running in Production

For production deployment, make sure to:

1. Set appropriate environment variables
2. Run the TypeScript build process (`npm run build`)
3. Configure proper MongoDB connection with authentication
4. Use a process manager like PM2

## License

This project is available under the MIT License.

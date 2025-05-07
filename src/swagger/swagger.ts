import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

// My API docs config
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management System API',
      version: '1.0.0',
      description: 'A TypeScript REST API for managing a library system',
      contact: {
        name: 'Joseph Ochiagha',
        email: 'joseph.ochiagha@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'isbn'],
          properties: {
            title: {
              type: 'string',
              description: 'Book title'
            },
            author: {
              type: 'string',
              description: 'Book author'
            },
            isbn: {
              type: 'string',
              description: 'ISBN number (unique)'
            },
            publisher: {
              type: 'string',
              description: 'Book publisher'
            },
            publishedYear: {
              type: 'integer',
              description: 'Year the book was published'
            },
            genre: {
              type: 'string',
              description: 'Book genre'
            },
            available: {
              type: 'boolean',
              description: 'Whether the book is available for borrowing',
              default: true
            },
            borrower: {
              type: 'string',
              description: 'Person who borrowed the book',
              nullable: true
            },
            borrowDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the book was borrowed',
              nullable: true
            },
            returnDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the book was returned',
              nullable: true
            }
          }
        },
        BookResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean'
            },
            data: {
              $ref: '#/components/schemas/Book'
            }
          }
        }
      }
    }
  },
  // Point to the routes file with book endpoints
  apis: [path.resolve(__dirname, '../routes/bookRoutes.ts')]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

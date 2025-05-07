import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger';
import bookRoutes from './routes/bookRoutes';
import dotenv from 'dotenv';

// Environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Library Management API (TypeScript)',
    docs: `/api-docs`
  });
});

// Book routes
app.use('/api/books', bookRoutes);

// Error handling middleware for 404
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found') as any;
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
});

export default app;

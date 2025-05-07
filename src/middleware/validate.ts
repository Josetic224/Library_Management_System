import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

// Validation middleware using Zod with TypeScript
const validate = (schema: AnyZodObject, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // If the property is params or query, convert values to appropriate types
      const dataToValidate = property === 'body' ? req[property] : convertParams(req[property]);
      
      // Validate the request data against the schema
      const result = schema.parse(dataToValidate);
      
      // Attach the validated data to the request
      req[property] = result;
      
      next();
    } catch (error) {
      // If Zod validation fails, format the errors and send response
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        
        res.status(400).json({
          success: false,
          errors: formattedErrors,
        });
        return;
      }
      
      // For non-validation errors
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server Error',
      });
    }
  };
};

// Convert string params to appropriate types
// Helps with handling query string params
const convertParams = (params: Record<string, any>): Record<string, any> => {
  const converted: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(params)) {
    // Convert 'true' and 'false' to boolean
    if (value === 'true') {
      converted[key] = true;
    } else if (value === 'false') {
      converted[key] = false;
    } 
    // Convert numeric strings to numbers
    else if (!isNaN(Number(value)) && value !== '' && typeof value === 'string') {
      converted[key] = Number(value);
    } 
    // Keep other values as is
    else {
      converted[key] = value;
    }
  }
  
  return converted;
};

export default validate;

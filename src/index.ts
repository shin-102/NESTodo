import express from 'express';
import path from 'path';
import dotenv from 'dotenv'; dotenv.config(); // Load environment variables from .env file
import authRoute from './routes/authRoute'; // Importing the authentication route
import todoRoute from './routes/todoRoute'; // Importing the todo route
import authMiddleware from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number; // Optional userId property to store the authenticated user's ID
  }
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.use('/auth', authRoute) // Take all routes defined in `authRoute.ts` and prefix them with `/auth`
app.use('/todos', authMiddleware , todoRoute) // Take all routes defined in `todoRoute.ts` and prefix them with `/todos`

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running at: http://localhost:${PORT}`);
});

import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running at: http://localhost:${PORT}`);
});

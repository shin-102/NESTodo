import express from 'express';
import db from '../database/database';

const router = express.Router();

// Get all todos for logged-in user
router.get('/', (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
  const todos = getTodos.all(req.userId)
  res.json(todos);
})

// create a new todo
router.post('/', (req, res) => { })

// update a todo by id
router.put('/:id', (req, res) => { })

// delete a todo by id
router.delete('/:id', (req, res) => { })

export default router;
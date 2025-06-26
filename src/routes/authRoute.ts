import express from 'express';
import bcrypt from 'bcryptjs'; // Encrypting passwords by hashing them
import jwt from 'jsonwebtoken'; // Generating JWT tokens - alphanumeric key to authenticate users without storing passwords or signing in every time
import db from '../database/database' // Importing the database connection

interface User {
  id: number;
  username: string;
  password: string;
}
// const app = express();
const router = express.Router();
const jwtSecret: string | undefined = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Encryption process
  const hashedPwd = bcrypt.hashSync(password, 10); // Hashing with a salt of 10 rounds 

  try 
  {
    // Check if username already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existingUser) {
      res.status(409).json({ message: 'Username already exists' });
      return;
    }
    const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
    const result = insertUser.run(username, hashedPwd);

    // init todo
    const defaultTodo = "Add your first todo!";
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, todo) VALUES (?, ?)`);
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // Generate JWT token
    const token = jwt.sign({ userId: result.lastInsertRowid }, jwtSecret, { expiresIn: '24h' });
    res.json({ token })
    return;
  } 
  catch (err) 
  {
    console.error(err);
    res.sendStatus(503);
    return;
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  try 
  {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username) as User | undefined;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    else if (typeof user.password !== 'string') {
      res.status(500).json({ message: 'User password is invalid' });
      return;
    }
    
    else {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '24h' });
      res.json({ token });      
      return;
    }

  }
  catch (err)
  {
    console.error(err);
    res.sendStatus(503);
    return;
  }
})

export default router;
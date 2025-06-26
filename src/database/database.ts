//import { DatabaseSync } from 'node:sqlite' // Syncronous SQLITE database // note : didn't work with sqlite3 package
import Database from 'better-sqlite3';

const db = new Database('database.db') 
// note : const db = new DatabaseSync('database.db') // Uncomment for persistent database

// Execute SQL commands from strings
// Users Table holds an id in each row, which connects to the Todos table by the user_id field.

//* Table for users
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`)

//* Table for Todos
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    todo TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`)

export default db;
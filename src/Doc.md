# NESTodo Project Documentation

This project is for **learning purposes**. As a developer, I am using this opportunity to learn how to document my actions and better understand the tools I work with.

---

## 🧱 Technologies and Modules

### Technologies

- Node.js: JavaScript runtime used for server-side development.
- Express.js: Web framework for Node.js to handle routing and middleware.
- TypeScript:Superset of JavaScript that adds static typing and better tooling.
- SQLite: Lightweight SQL database for local data persistence.
- TailwindCSS: Utility-first CSS framework for building modern UI.

### Modules

- bcryptjs: Used for hashing passwords before storing them securely in the database.
- jsonwebtoken: Used for generating and verifying JSON Web Tokens (JWT) for authentication.

---

## ⚙️ Setup Steps Taken

1. Initialized project with `npm init -y`.
2. Installed runtime dependencies: `express`, `bcryptjs`, `jsonwebtoken`.
3. Installed development dependencies: `typescript`, type definitions, `ts-node`, and `nodemon`.
4. Created basic folder structure (`src/`) and a TypeScript entry point (`index.ts`).
5. Set up `tsconfig.json` for compiling TypeScript code.
6. Created scripts for development (`npm run dev`), build (`npm run build`), and production (`npm start`).
7. Created this `Documentation.md` to explain tools and setup steps.

---
## 📘 Notes on Tooling and Configuration

### ⚙️ What is `ts-node`?

`ts-node` is a utility that allows you to run TypeScript files directly without compiling them to JavaScript first. It integrates with the Node.js runtime and compiles TypeScript on the fly. This is very useful during development, as it allows you to test and run TypeScript files quickly without running `tsc` manually.

- 🔹 Installed as a dev dependency: `npm install -D ts-node`
- 🔹 Typically used with `nodemon` to enable hot-reloading in development
- 🔹 Does not need a build step; just runs `.ts` files directly

---

### 🔁 CommonJS vs ES Modules (ESM) in TypeScript + Node.js

Node.js supports two module systems:

| Feature           | CommonJS                        | ES Modules (ESM)                  |
|------------------|----------------------------------|-----------------------------------|
| File extension   | `.js` (usually no extensions)    | Must use `.js`, even in TS        |
| `import` syntax  | `const express = require(...)`   | `import express from 'express'`   |
| Interop          | Works well with most Node tools  | Can be stricter / trickier        |
| TS config        | `"module": "commonjs"`           | `"module": "ESNext"`              |
| Node config      | Default                          | Needs `"type": "module"` in `package.json` |
| Compatibility    | ✅ Easier with `ts-node` and `nodemon` | ❗ Requires special flags like `--esm` in `ts-node` |

> ⚠️ In development, CommonJS is usually more straightforward.  
> For ESM, you must configure everything carefully (`ts-node`, file extensions, import paths, etc.).

---

### 🎨 TailwindCSS Setup in Public Folder

The front-end portion of this project uses static HTML + TailwindCSS, served via Express.

#### 🛠️ Installation Steps:

1. **Install Tailwind CLI:**
   ```bash
   npm install -D tailwindcss

---

## Extra Note
Not present in program but learned along the way

### Concurrently

1. Install concurrently:
```bash
npm install -D concurrently
```
2. Add combined script:
```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "tailwind": "npx tailwindcss -i input.css -o ./public/styles.css --watch",
  "dev:all": "concurrently \"npm run dev\" \"npm run tailwind\""
}
```
3. Use:
```bash
npm run dev:all
```
This runs both the Express server and Tailwind watcher simultaneously.
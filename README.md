# Todo API

A simple, secure RESTful Todo List API built with **Node.js**, **Express**, and **MongoDB**. Supports full **CRUD** operations on tasks, user authentication with JWT, and proper error handling.

## Features
- User registration and login (JWT authentication)
- Protected routes (only authenticated users can create/read/update/delete their tasks)
- Full CRUD for Todo tasks (create, read, update, delete)
- MongoDB persistence using Mongoose
- Custom error handling middleware
- Clean project structure (controllers, routes, models, middleware)

## Tech Stack
- **Node.js** + **Express.js** – Web framework
- **MongoDB** + **Mongoose** – Database & ODM
- **JWT** (JSON Web Tokens) – Authentication
- **dotenv** – Environment variables
- **Other** (express.json, custom middleware, etc.)

## Install dependencies:
npm install
Create .env file in the root folder with these values:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo_db
JWT_SECRET=your_very_long_random_secret_key_here

### Make sure MongoDB is running:
Local: start MongoDB service (mongod)
Cloud: use MongoDB Atlas (recommended for production)

## Start the server: npm run dev

## Testing the API
Use tools like:
Postman
VS Code REST Client → open request.rest and send requests

Never commit.env file (already in .gitignore)
Use a strong JWT_SECRET (min 32 chars, random)
In production: add HTTPS, rate limiting, input validation (Joi/Zod)
Hash passwords properly (bcrypt assumed in your code)

## Future Improvements (Ideas)
Add task categories / priorities / due dates
Implement refresh tokens
Add pagination for GET /tasks
Add unit/integration tests (Jest + Supertest)
Deploy to Render, Vercel, Railway, or Azure

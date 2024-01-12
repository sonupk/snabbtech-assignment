# snabbtech-assignment


This project provides a simple user authentication system using Node.js, Express, and MongoDB.

## Features

- User registration with encrypted passwords
- User login with JWT token authentication
- Password reset functionality
- Forgot password feature
- Retrieve user information with valid token

## Technologies Used

- Node.js
- Express.js
- MongoDB
- bcrypt (for password hashing)
- jsonwebtoken (for JWT authentication)
- nodemailer (for sending emails)

## Getting Started

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   mkdir project
   git clone https://github.com/sonupk/snabbtech-assignment.git
   cd snabbtech-assignment

Install dependencies:
npm install

Create a .env file in the project root and set the following environment variables:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/snabbtech-DB
JWT_SECRET=sonupk

Start the server:npx nodemon src/index.js
The server will run on http://localhost:3000 by default.

Test the authentication APIs using Postman or your preferred API testing tool.

API Endpoints
POST /register: Register a new user
POST /login: Login with an existing user
POST /reset-password: Reset user password
POST /forgot-password: Send instructions for password reset
GET /user-info: Retrieve user information with a valid token








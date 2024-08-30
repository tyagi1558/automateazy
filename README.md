# Automateazy Task

## Overview

This project is an API service that provides user authentication, including signup and login functionality. It is built using Node.js, Express, and MongoDB. The API allows users to register and log in, providing JWT-based authentication for secure access to protected routes.

## Features

- **User Signup**: Allows new users to register with their name, email, mobile number, and password.
- **User Login**: Authenticates registered users and provides a JWT token for session management.
- **Secure Endpoints**: Protected routes that require valid JWT tokens for access.
- **Password Hashing**: Uses bcrypt to securely hash user passwords before storing them in the database.
- **Error Handling**: Provides comprehensive error messages for failed operations, including validation errors and authentication failures.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to create robust APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: Token-based authentication for securing endpoints.
- **bcrypt**: Library for hashing passwords securely.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tyagi1558/automateazy.git
   cd automateazy

2. **Install dependencies:**:
   ```bash
   npm install

3. **Start the server:**

   ```bash
   npm start

The server will start on http://localhost:5000 by default.

4. **API Endpoints**
   1.  ***Signup***
   ```bash

    URL: /api/auth/signup

  2.Method:
  ```bash
      POST
      Description: Registers a new user.
      Request:
      Headers: Content-Type: application/json
     Body:
      json
     {
      "name": "Anmol Tyagi",
      "email": "tanmol543@gmail.com",
      "mobile_no": "6396534539",
      "password": "Anmol@123"
   }
Responses:
Success (201):
json
{
  "success": true,
  "message": "User registered successfully"
}
Error (400):
json
{
  "success": false,
  "message": "User already exists"
}
```
3. **Login**
```
URL: /api/auth/login
```
 1. Method:
```
POST
 Description: Logs in an existing user.
Request:
Headers: Content-Type: application/json
Body:
json
{
  "email": "tanmol543@gmail.com",
  "password": "Anmol@123"
}
Responses:
Success (200):
json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Error (400):
json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## Usage

- **Register a User:**
  
Use the /api/auth/signup endpoint to create a new user.

- **Login:**

Use the /api/auth/login endpoint to authenticate a user and receive a JWT token.

- **Secure Routes:**

Access protected routes by including the JWT token in the Authorization header as a Bearer token.

## Error Handling

- **400 Bad Request:**

Occurs if the input data fails validation or if required fields are missing.

- **401 Unauthorized:**

Occurs if the provided JWT token is invalid or expired.

- **500 Internal Server Error:**

General server error.

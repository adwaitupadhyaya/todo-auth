# Todo App with Express Backend

This project is a simple Todo application built with an Express backend, focusing on user authentication and authorization using JWT (JSON Web Token) and password hashing with bcrypt. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on their own todos while ensuring that they cannot access or modify todos of other users.

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Password Hashing**: Passwords are hashed using bcrypt for enhanced security.
- **CRUD Operations**: Users can create, read, update, and delete their own todos.
- **Authorization**: Users can only access their own todos, ensuring data privacy and security.

## Technologies Used

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **JWT**: For secure user authentication.
- **bcrypt**: For hashing passwords to enhance security.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-app-express.git
   cd todo-app-express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. The application will be running on \`http://localhost:3000\`.

OR

1. With docker

```bash
  docker pull adwait627upadhyaya/todo-auth:latest
```

## API Endpoints

- **POST auth/signup**: Register a new user.

  ```json
  {
    "name": "example",
    "email": "example@gmail.com",
    "password": "example"
  }
  ```

- **POST auth/login**: Login a user and receive a JWT.

  ```json
  {
    "email": "example@gmail.com",
    "password": "example"
  }
  ```

- **POST auth/refresh**: refresh by passing the refresh token an receive a new access token.

  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiYWR3OCIsImVtYWlsIjoiYWR3OEBnbWFpbC5jb20iLCJpYXQiOjE3MjA1MjMzMTIsImV4cCI6MTcyMDUyNjMxMn0.ysHfrDmJTibjah2XYPEod-bfAgQs9fqtN35kUDdtNVI"
  }
  ```

- **GET /todos**: Get all todos for the authenticated user.

- **GET /todos/:id**: Get specific todos for the authenticated user.

- **POST /todos**: Create a new todo for the authenticated user.

  ```json
  {
    "todo": "example",
    "isCompleted": true,
    "dueDate": "2024-07-22"
  }
  ```

- **PUT /todos/:id**: Update a todo by ID for the authenticated user.

  ```json
  {
    "todo": "example",
    "isCompleted": true,
    "dueDate": "2024-07-22"
  }
  ```

- **DELETE /todos/:id**: Delete a todo by ID for the authenticated user.

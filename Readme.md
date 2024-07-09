# Todo App with Express Backend

This project is a simple Todo application built with an Express backend, focusing on user authentication and authorization using JWT (JSON Web Token) and password hashing with bcrypt. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on their own todos while ensuring that they cannot access or modify todos of other users.

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Password Hashing**: Passwords are hashed using bcrypt for enhanced security.
- **CRUD Operations**: Users can create, read, update, and delete their own todos.
- **Authorization**: Users can only access their own todos, ensuring data privacy and security.
- **No Database**: All data is stored in memory using arrays, making it simple and lightweight.

## Technologies Used

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **JWT**: For secure user authentication.
- **bcrypt**: For hashing passwords to enhance security.

## How to Run

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/todo-app-express.git
   cd todo-app-express
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

4. The application will be running on \`http://localhost:3000\`.

## API Endpoints

- **POST /register**: Register a new user.
  \`\`\`json
  {
  "name": "example",
  "email": "example@gmail.com",
  "password": "example"
  }
  \`\`\`

- **POST /login**: Login a user and receive a JWT.
  \`\`\`json
  {
  "email": "example@gmail.com",
  "password": "example"
  }
  \`\`\`

- **GET /todos**: Get all todos for the authenticated user.

- **POST /todos**: Create a new todo for the authenticated user.
  \`\`\`json
  {
  "todo": "example",
  "isCompleted": true,
  "dueDate": "2024-07-22"
  }
  \`\`\`

- **PUT /todos/:id**: Update a todo by ID for the authenticated user.
  \`\`\`json
  {
  "todo": "example",
  "isCompleted": true,
  "dueDate": "2024-07-22"
  }
  \`\`\`

- **DELETE /todos/:id**: Delete a todo by ID for the authenticated user.

## Future Improvements

- Add a frontend interface using HTML, CSS, and JavaScript.
- Integrate a database for persistent data storage.
- Implement additional features such as due dates and priority levels for todos.

Feel free to fork this repository, submit issues, or contribute to the development of this application.

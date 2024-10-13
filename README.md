# Library Management API

This is a library management API built with Node.js, Express, and PostgreSQL. The API allows users to manage books, users, and borrow/return functionalities. The application is containerized using Docker for easy deployment.

## Features

- **User Management**: Create and retrieve users.
- **Book Management**: Create and retrieve books in the library.
- **Borrowing System**: Users can borrow and return books, with scoring for each return.
- **Error Handling**: Comprehensive error handling with custom error classes.
- **Database**: Utilizes PostgreSQL for data storage.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **Sequelize**: ORM for PostgreSQL database interactions.
- **PostgreSQL**: Relational database for storing user and book data.
- **Docker**: For containerization of the application and database.
- **TypeScript**: For type safety and better development experience.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- Basic knowledge of Docker and API development.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OldPlanet/library-management-api
   cd library-management-api

2. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   
3. The API will be accessible at http://localhost:3000

### Environment Variables

The following environment variables are used:

- `DB_NAME`: Name of the PostgreSQL database (default: `library_db`)
- `DB_USER`: PostgreSQL username (default: `postgres`)
- `DB_PASSWORD`: PostgreSQL password (default: `password`)
- `DB_HOST`: Hostname for the database (default: `db`)
- `DB_PORT`: Port for the database (default: `5432`)

### API Endpoints

- Users
  - `POST /users`: Create a new user
  - `GET /users`: Retrieve all users
  - `GET /users/:id`: Retrieve a user by ID
- Books
  - `POST /books`: Create a new book
  - `GET /books`: Retrieve all books
  - `GET /books/:id`: Retrieve a book by ID
- Borrowing
  - `POST /users/:userId/borrow/:bookId`: Borrow a book
  - `POST /users/:userId/return/:bookId`: Return a borrowed book with a score

### Error Handling
Errors are handled through custom error classes, and the API responds with appropriate HTTP status codes and messages.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes.

### Author
[Burak Güler](https://github.com/OldPlanet)






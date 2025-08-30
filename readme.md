# Library Management Web App

A full-stack MERN project for Library Management. The app includes features such as adding, updating & managing books, state management, and secure token-based authentication.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## About the Project

This project is designed to help users borrow, return books and manage books for librarians. It offers features like search/filter books, borrow/return book, and user authentication. The app is built using the MERN stack and provides a responsive user interface with dynamic state management.

## Features

- 📚 Search & Filter for Books
- 📖 Borrow and return books (transactions) for users
- 🔐 Token-based authentication for secure user sessions
- 👨‍💼 Admin dashboard to track transactions and books
- 🔄 State management for seamless user experience
- 📱 Responsive design for all major screen sizes

## Tech Stack

### Frontend
- **React.js** - UI Framework
- **Tailwind CSS** - Styling
- **Redux Toolkit** - Global state management and seamless UI updates
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - Python asynchronous web framework
- **MongoDB** - NoSQL Database
- **Motor** - Async MongoDB driver
- **Beanie ODM** - Document modeling

### Authentication
- **JWT** - Secure token-based authentication

## Demo

[Watch the Demo Video](https://drive.google.com/file/d/1GPH_wQDZ0MXNE2CToucaeYjgGRW4G61r/view?usp=sharing)

## Screenshots

### Homepage
![Homepage Screenshot](assets/lib-mgmt%201.png)

### Admin Dashboard
![Admin Dashboard Screenshot](assets/lib-mgmt%202.png)

### Borrowed Books
![Borrowed Books Screenshot](assets/lib-mgmt%203.png)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- MongoDB

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pritthish20/LibraryManangement.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd LibraryManangement
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

4. **Install backend dependencies:**
   ```bash
   cd ../server
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

6. **Start the development servers:**
   
   **Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   
   **Backend:**
   ```bash
   cd server
   uvicorn app.main:app --reload
   ```

## Usage

### For Users
- Search and filter books by title, author, or genre
- Borrow books and track borrowed items
- Return books and view transaction history
- Register and log in for a personalized experience

### For Librarians
- Add new books to the library catalog
- Update book information and availability
- Manage user transactions
- View comprehensive admin dashboard with analytics

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Books
- `GET /books` - Get all books
- `POST /books` - Add new book (Admin only)
- `PUT /books/{id}` - Update book (Admin only)
- `DELETE /books/{id}` - Delete book (Admin only)

### Transactions
- `POST /transactions/borrow` - Borrow a book
- `POST /transactions/return` - Return a book
- `GET /transactions/user/{user_id}` - Get user transactions

<!-- ## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->

## Contact

**Pritthish Sarkar**
- Email: [pritthishps20@gmail.com](mailto:pritthishps20@gmail.com)
- GitHub: [@Pritthish20](https://github.com/Pritthish20)
<!-- - Project Link: [https://github.com/Pritthish20/LibraryManangement](https://github.com/Pritthish20/LibraryManangement) -->

---

Happy coding! 🎉
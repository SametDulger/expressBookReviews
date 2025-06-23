# Express Book Reviews API

A comprehensive RESTful API built with Node.js and Express.js for managing book reviews and user authentication. This project demonstrates modern web development practices including session management, JWT authentication, and RESTful API design.

## 🎯 Project Overview

Express Book Reviews is a full-featured book review system that allows users to register, authenticate, browse books, and manage their reviews. Built as part of the IBM Developer Skills Network Node.js course, this project showcases essential backend development concepts including user authentication, session management, and RESTful API design.

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration** - Secure user account creation
- **User Login** - JWT-based authentication system
- **Session Management** - Express-session for persistent user sessions
- **Access Control** - Protected routes for authenticated users

### 📚 Book Management
- **Book Catalog** - Comprehensive book database with author and title information
- **Book Search** - Search books by ISBN, author, or title
- **Book Details** - Detailed book information retrieval
- **Review System** - User-generated book reviews and ratings

### 🔍 Search & Discovery
- **ISBN Search** - Find books by International Standard Book Number
- **Author Search** - Discover books by specific authors
- **Title Search** - Search books by title (partial matching supported)
- **Case-insensitive Search** - Flexible search functionality

### 💬 Review System
- **Add Reviews** - Authenticated users can add book reviews
- **Update Reviews** - Modify existing reviews
- **Delete Reviews** - Remove user reviews
- **Review Management** - User-specific review tracking

## 🛠️ Technologies Used

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.1** - Fast, unopinionated web framework
- **Express-session 1.17.3** - Session middleware for Express

### Authentication & Security
- **JSON Web Tokens (JWT) 8.5.1** - Secure token-based authentication
- **Session-based Authentication** - Persistent user sessions
- **Password Validation** - Secure user credential verification

### Development Tools
- **Nodemon 2.0.19** - Automatic server restart during development
- **Axios 1.9.0** - HTTP client for API requests

### Data Management
- **In-memory Database** - JSON-based book storage
- **User Management** - Array-based user storage
- **Review System** - Nested object structure for reviews

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SametDulger/expressBookReviews.git
   cd expressBookReviews/final_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the API**
   - **Base URL**: `http://localhost:5000`
   - **API Documentation**: Available through the endpoints below

### Available Scripts

- `npm start` - Start the development server with nodemon
- `npm test` - Run tests (currently not implemented)

## 📁 Project Structure

```
expressBookReviews/
├── final_project/
│   ├── router/
│   │   ├── auth_users.js      # Authentication and user routes
│   │   ├── booksdb.js         # Book database and data
│   │   └── general.js         # Public book routes
│   ├── index.js               # Main application entry point
│   ├── package.json           # Project dependencies and scripts
│   └── package-lock.json      # Dependency lock file
├── LICENSE                    # Apache 2.0 license
└── README.md                  # Project documentation
```

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

#### User Registration
```http
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "message": "User registered successfully."
}
```

#### Get All Books
```http
GET /
```

**Response:**
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  },
  "2": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "reviews": {}
  }
}
```

#### Get Book by ISBN
```http
GET /isbn/{isbn}
```

**Example:**
```http
GET /isbn/1
```

**Response:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

#### Get Books by Author
```http
GET /author/{author}
```

**Example:**
```http
GET /author/Chinua Achebe
```

**Response:**
```json
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

#### Get Books by Title
```http
GET /title/{title}
```

**Example:**
```http
GET /title/Things Fall Apart
```

**Response:**
```json
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

### Protected Endpoints (Authentication Required)

#### User Login
```http
POST /customer/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "message": "User successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Add/Update Review
```http
PUT /customer/auth/review/{isbn}?review={review_text}
```

**Example:**
```http
PUT /customer/auth/review/1?review=Excellent book with deep cultural insights
```

**Response:**
```json
{
  "message": "Review added/updated successfully",
  "reviews": {
    "john_doe": "Excellent book with deep cultural insights"
  }
}
```

#### Delete Review
```http
DELETE /customer/auth/review/{isbn}
```

**Example:**
```http
DELETE /customer/auth/review/1
```

**Response:**
```json
{
  "message": "Review deleted successfully",
  "reviews": {}
}
```

## 🔧 Authentication Flow

### 1. User Registration
1. User sends POST request to `/register` with username and password
2. System validates input and checks for existing users
3. New user is added to the users array
4. Success response is returned

### 2. User Login
1. User sends POST request to `/customer/login` with credentials
2. System validates username and password
3. JWT token is generated and stored in session
4. Token is returned to user

### 3. Protected Route Access
1. User includes session cookie in subsequent requests
2. Middleware checks for valid session authorization
3. If valid, request proceeds; if not, 401 error is returned

## 📊 Data Models

### User Model
```javascript
{
  username: "string",
  password: "string"
}
```

### Book Model
```javascript
{
  author: "string",
  title: "string",
  reviews: {
    "username": "review_text"
  }
}
```

### Session Model
```javascript
{
  authorization: {
    token: "jwt_token",
    username: "user_username"
  }
}
```

## 🔒 Security Features

### Authentication
- **JWT Tokens** - Secure token-based authentication
- **Session Management** - Persistent user sessions
- **Password Validation** - Secure credential verification
- **Route Protection** - Middleware-based access control

### Input Validation
- **Required Fields** - Username and password validation
- **Duplicate Prevention** - Username uniqueness checking
- **Error Handling** - Comprehensive error responses
- **Input Sanitization** - Basic input validation

## 📝 Error Handling

### Standard Error Responses
```json
{
  "message": "Error description"
}
```

### HTTP Status Codes
- **200 OK** - Successful operations
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Authentication required
- **404 Not Found** - Resource not found
- **409 Conflict** - Username already exists
- **500 Internal Server Error** - Server-side errors

## 🧪 Testing

### Using cURL
```bash
# Register a new user
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Login
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}' \
  -c cookies.txt

# Get all books
curl http://localhost:5000/

# Add a review (with session cookie)
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great book!" \
  -b cookies.txt
```

### Using Postman
1. Import the collection
2. Set up environment variables
3. Test each endpoint sequentially
4. Verify authentication flow

## 🚀 Deployment

### Development
```bash
npm start
```

### Production
```bash
# Set NODE_ENV to production
export NODE_ENV=production

# Start the server
node index.js
```

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow Node.js best practices
- Use proper error handling
- Add input validation
- Test all endpoints thoroughly
- Update documentation as needed

## 🔮 Future Enhancements

### Planned Features
- **Database Integration** - MongoDB or PostgreSQL integration
- **Password Hashing** - bcrypt for secure password storage
- **Email Verification** - User email confirmation
- **Book Ratings** - Star-based rating system
- **Book Categories** - Genre-based book organization
- **User Profiles** - Extended user information
- **Book Recommendations** - AI-powered book suggestions

### Technical Improvements
- **Input Validation** - Joi or express-validator
- **Rate Limiting** - API usage throttling
- **Caching** - Redis integration
- **Logging** - Winston or Morgan logging
- **Testing** - Jest or Mocha test framework
- **API Documentation** - Swagger/OpenAPI integration

## 📝 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM Developer Skills Network** - Course materials and project structure
- **Express.js Team** - Excellent web framework
- **Node.js Community** - Continuous improvements and support
- **JWT.io** - JSON Web Token documentation

## 📞 Support

For questions, issues, or contributions:
- **Issues**: [GitHub Issues](https://github.com/SametDulger/expressBookReviews/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SametDulger/expressBookReviews/discussions)

## 📚 Sample Books

The API includes a curated collection of classic literature:

- **Things Fall Apart** by Chinua Achebe
- **Fairy tales** by Hans Christian Andersen
- **The Divine Comedy** by Dante Alighieri
- **The Epic Of Gilgamesh** by Unknown
- **The Book Of Job** by Unknown
- **One Thousand and One Nights** by Unknown
- **Njál's Saga** by Unknown
- **Pride and Prejudice** by Jane Austen
- **Le Père Goriot** by Honoré de Balzac
- **Molloy, Malone Dies, The Unnamable** by Samuel Beckett

---

**Built with ❤️ using Node.js and Express.js**

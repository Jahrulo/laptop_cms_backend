# Laptop CMS Backend

A robust and secure Content Management System (CMS) backend for managing laptop data, built with Node.js and Express.

## 🚀 Features

- **Authentication & Authorization**: Secure user authentication with JWT
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**:
  - CORS protection
  - Rate limiting
  - XSS protection
  - MongoDB sanitization
  - Helmet security headers
- **Logging**: Winston logger implementation
- **Email Integration**: SendGrid email service
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd laptop-cms-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
SENDGRID_API_KEY=your_sendgrid_api_key
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT)

## 📚 API Documentation

API documentation is available at `/api-docs` when the server is running. This provides detailed information about all available endpoints, request/response formats, and authentication requirements.

### Base URL

```
http://localhost:3000/api/v1
```


#### Get All Laptops

```http
GET /laptop
Authorization: Bearer <token>
```

#### Get Single Laptop

```http
GET /laptop/:id
Authorization: Bearer <token>
```

#### Create Laptop

```http
POST /laptop
Authorization: Bearer <token>
Content-Type: application/json

{
  "brand": "string",
  "model": "string",
  "specifications": {
    "processor": "string",
    "ram": "string",
    "storage": "string",
    "display": "string"
  },
  "price": "number",
  "stock": "number"
}
```

#### Update Laptop

```http
PUT /laptop/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "brand": "string",
  "model": "string",
  "specifications": {
    "processor": "string",
    "ram": "string",
    "storage": "string",
    "display": "string"
  },
  "price": "number",
  "stock": "number"
}
```

#### Delete Laptop

```http
DELETE /laptop/:id
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
├── config/             # Configuration files
│   ├── database.config.js
│   └── env.config.js
├── controllers/        # Route controllers
│   ├── user.controller.js
│   └── laptop.controller.js
├── docs/              # Documentation files
│   └── swagger.config.js
├── middlewares/       # Custom middlewares
│   ├── arcjet.middleware.js
│   ├── error.middleware.js
│   └── notFound.middleware.js
├── models/            # Database models
│   ├── user.model.js
│   └── laptop.model.js
├── routes/            # API routes
│   ├── user.route.js
│   └── laptop.route.js
├── utils/             # Utility functions
├── logs/              # Application logs
├── server.js          # Application entry point
└── package.json       # Project dependencies
```

## 🔒 Security Features

### CORS Protection

- Configurable allowed origins
- Secure cookie handling
- Credentials support

### Rate Limiting

- Prevents abuse of API endpoints
- Configurable limits per IP address

### XSS Protection

- Input sanitization
- Output encoding
- Content Security Policy

### MongoDB Sanitization

- Prevents NoSQL injection attacks
- Data validation

### Helmet Security

- Sets various HTTP headers
- Prevents common web vulnerabilities

### JWT Authentication

- Secure token-based authentication
- Token expiration
- Refresh token support

## 🔍 Error Handling

The application implements a global error handling middleware that:

- Catches and processes all errors
- Provides consistent error responses
- Logs errors appropriately
- Handles both operational and programming errors

### Error Response Format

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "status": 400
  }
}
```

## 📊 Logging

The application uses Winston for logging with the following features:

- Different log levels (error, warn, info, debug)
- Log rotation
- Separate log files for different environments
- Console and file logging

### Log Levels

- ERROR: For error messages
- WARN: For warning messages
- INFO: For general information
- DEBUG: For debugging information

## 🛠️ Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Swagger**: API documentation
- **Winston**: Logging
- **SendGrid**: Email service
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **bcryptjs**: Password hashing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use meaningful variable names
- Write clear comments
- Follow the existing code structure

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **devC-Ray** - _Initial work_

## 📄 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the powerful database
- All contributors who have helped shape this project

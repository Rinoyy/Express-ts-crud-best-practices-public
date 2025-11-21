# Express.js CRUD API with Prisma & Joi Validation

A RESTful API built with Express.js, Prisma ORM, and Joi validation for managing items with full CRUD operations.

## 🚀 Features

- ✅ Create, Read, Update, and Delete operations
- ✅ Input validation using Joi
- ✅ Prisma ORM for database management
- ✅ RESTful API design
- ✅ Error handling and proper HTTP status codes
- ✅ Consistent JSON response format

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) or [XAMPP](https://www.apachefriends.org/)
- [Postman](https://www.postman.com/) (for API testing)

## 🛠️ Installation

### 1. Clone the Repository

```bash
# Create a project folder
mkdir my-express-crud
cd my-express-crud

# Clone the repository
git clone https://github.com/Rinoyy/ExpressCrud.git .
```

### 2. Install Dependencies

```bash
# Install all required packages
npm install

# Or install packages individually
npm install express prisma @prisma/client joi multer
npm install nodemon --save-dev
```

### 3. Database Setup

#### Create Database
1. Start XAMPP or your MySQL server
2. Open phpMyAdmin at `http://localhost/phpmyadmin`
3. Create a new database named `mydatabase`

#### Configure Prisma
1. Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://root:@localhost:3306/mydatabase"
```

2. Update your `schema.prisma` file:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Item {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the Application

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## 📡 API Endpoints

| Method   | Endpoint          | Description           |
|----------|-------------------|-----------------------|
| `GET`    | `/api/items`      | Get all items         |
| `GET`    | `/api/items/:id`  | Get single item by ID |
| `POST`   | `/api/items`      | Create new item       |
| `PUT`    | `/api/items/:id`  | Update item by ID     |
| `DELETE` | `/api/items/:id`  | Delete item by ID     |

## 📝 API Usage Examples

### 1. Get All Items

**Request:**
```http
GET http://localhost:3000/api/items
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "Description for item 1",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Item

**Request:**
```http
GET http://localhost:3000/api/items/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Item 1",
    "description": "Description for item 1"
  }
}
```

### 3. Create New Item

**Request:**
```http
POST http://localhost:3000/api/items
Content-Type: application/json

{
  "name": "New Item",
  "description": "This is a new item with detailed description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": 2,
    "name": "New Item",
    "description": "This is a new item with detailed description"
  }
}
```

**Validation Rules:**
- `name`: Required, 4-30 characters
- `description`: Required, 10-100 characters

### 4. Update Item

**Request:**
```http
PUT http://localhost:3000/api/items/1
Content-Type: application/json

{
  "name": "Updated Item",
  "description": "This item has been updated"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Item",
    "description": "This item has been updated"
  }
}
```

### 5. Delete Item

**Request:**
```http
DELETE http://localhost:3000/api/items/1
```

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": {
    "id": 1,
    "name": "Item 1",
    "description": "Description for item 1"
  }
}
```

## 🧪 Testing with Postman

### Step-by-Step Guide

1. **Open Postman**
   - Download from [postman.com](https://www.postman.com/downloads/)

2. **Create a New Collection**
   - Click "New" → "Collection"
   - Name it "Express CRUD API"

3. **Add Requests**
   - Click "Add Request" in your collection
   - Configure each endpoint as shown above

4. **Test GET Request**
   - Method: `GET`
   - URL: `http://localhost:3000/api/items`
   - Click "Send"

5. **Test POST Request**
   - Method: `POST`
   - URL: `http://localhost:3000/api/items`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Test Item",
     "description": "This is a test item description"
   }
   ```
   - Click "Send"

## 📁 Project Structure

```
express-crud/
├── controllers/
│   └── itemController.js
├── routes/
│   └── itemRoutes.js
├── validation/
│   └── itemValidation.js
├── prisma/
│   └── schema.prisma
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🔧 Configuration

### package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Environment Variables

Create a `.env` file:
```env
DATABASE_URL="mysql://root:@localhost:3306/mydatabase"
PORT=3000
```

## ⚠️ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Name must be at least 4 characters"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Item not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Failed to fetch items"
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Rino Sitanggang**
- GitHub: [@Rinoyy](https://github.com/Rinoyy)

## 🙏 Acknowledgments

- Express.js Documentation
- Prisma Documentation
- Joi Validation Library
- Node.js Community

---

⭐ If you find this project helpful, please give it a star on GitHub!

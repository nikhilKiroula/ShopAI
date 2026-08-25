# 🛍️ ShopAI — Full Stack E-Commerce Application

A full-stack e-commerce web application built using the **MERN Stack**.

ShopAI provides a complete shopping experience for customers along with a dedicated **Admin Panel** for managing products, users, orders, and store statistics.

The project focuses on real-world full-stack development concepts including **React.js, REST APIs, MongoDB, Mongoose, JWT authentication, access and refresh tokens, role-based authorization, protected routes, CRUD operations, product search, category filtering, cart and wishlist management, checkout, order management, and admin dashboard analytics.**

---

# 🚀 Project Status

> 🟢 **Core E-Commerce Features Implemented**

The application currently includes:

- Customer authentication
- JWT-based authentication
- Access & refresh token system
- Protected user routes
- Admin role-based authorization
- Product management
- Product search
- Category filtering
- Product sorting
- Cart
- Wishlist
- Checkout
- Address management
- Order management
- User profile
- Admin dashboard
- Admin product management
- Admin order management
- User management

---

# ✨ Features

## 👤 User Authentication & Account Management

- User registration
- User login
- User logout
- JWT-based authentication
- Access token & refresh token
- HTTP-only authentication cookies
- Protected routes
- Role-based authorization
- Get current user profile
- User profile management

---

# 🛍️ Product System

ShopAI provides a complete product browsing system.

### Product Features

- Product listing
- Product details
- Product search
- Category filtering
- Product sorting
- Product stock information
- Product ratings
- Product images
- Active/inactive product handling
- Admin product CRUD operations

### Product Search

Products can be searched using their:

- Name
- Description

Example:

```text
GET /api/products?search=laptop
```

The backend performs case-insensitive searching using MongoDB queries.

---

# 🏷️ Category Filtering

Products can be filtered according to their category.

Example:

```text
GET /api/products?category=electronics
```

The category selected from the navigation bar is passed through the URL:

```text
/products?category=electronics
```

The frontend reads the query parameter and sends it to the backend.

### Flow

```text
Category Bar
     ↓
User selects category
     ↓
URL Query Parameter
     ↓
Products Page
     ↓
getProducts(category)
     ↓
GET /api/products?category=...
     ↓
Express Controller
     ↓
MongoDB Filter
     ↓
Filtered Products
     ↓
Product Grid
```

This keeps the main category filtering logic on the backend.

---

# 🔎 Product Sorting

Products can be sorted according to:

- Featured
- Price: Low to High
- Price: High to Low
- Highest Rated

The backend also supports sorting parameters such as:

```text
price_asc
price_desc
rating
```

---

# 🛒 Shopping Cart

Customers can:

- Add products to cart
- Update product quantity
- Remove products
- View cart items
- Calculate cart totals
- Continue to checkout

Cart state is handled on the frontend and integrated with the authenticated shopping flow.

---

# ❤️ Wishlist

Customers can:

- Add products to wishlist
- Remove products from wishlist
- View wishlist
- Navigate from wishlist to product details

---

# 💳 Checkout

The checkout flow allows customers to:

- Review cart items
- Select an address
- Review order information
- Place an order

---

# 📦 Order Management

Customers can:

- Place orders
- View order history
- View individual order details
- Track order status

Orders contain information such as:

- User
- Products
- Total amount
- Payment status
- Order status
- Creation date

---

# 🏠 Address Management

Authenticated users can:

- Add addresses
- Edit addresses
- View saved addresses
- Use saved addresses during checkout

---

# 👨‍💼 Admin Panel

ShopAI includes a separate admin interface.

Admin routes are protected using:

```text
verifyJWT
     ↓
verifyAdmin
     ↓
Admin Controller
```

Only authenticated users with:

```text
role: "admin"
```

can access admin resources.

---

# 📊 Admin Dashboard

The admin dashboard provides an overview of the store.

Dashboard statistics include:

- Total Products
- Total Users
- Total Orders
- Total Revenue
- Order Status Statistics
- Recent Orders

Dashboard endpoint:

```text
GET /api/admin/dashboard/stats
```

### Dashboard Flow

```text
Admin
  ↓
Admin Dashboard
  ↓
API Request
  ↓
verifyJWT
  ↓
verifyAdmin
  ↓
Dashboard Controller
  ↓
MongoDB
  ↓
Statistics
  ↓
Dashboard UI
```

---

# 📦 Admin Product Management

Administrators can manage products through the admin panel.

Supported operations:

- View products
- Add products
- Edit products
- Delete products
- View product details

Product ownership is maintained using the `createdBy` field.

---

# 📋 Admin Order Management

Administrators can:

- View customer orders
- View order details
- View payment status
- View order status
- Manage orders from the admin panel

---

# 👥 User Management

The admin panel also provides a user management section.

Administrators can view registered users and their account information through the admin interface.

---

# 🔄 Admin ↔ Store Navigation

An administrator can switch between:

```text
Admin Dashboard
      ↕
Customer Store
```

This allows the admin to browse the normal customer-facing store without logging out.

---

# 🔐 Security

ShopAI implements several security mechanisms.

- JWT authentication
- Access token & refresh token mechanism
- Password hashing with bcrypt
- HTTP-only cookies
- Protected routes
- Admin role-based authorization
- Refresh token validation
- Sensitive fields excluded from responses
- Environment variables for secrets
- Server-side authorization

---

# 🔑 Authentication Architecture

ShopAI uses an access-token and refresh-token based authentication system.

## Login Flow

```text
User
  ↓
Login Form
  ↓
POST /login
  ↓
Validate Email & Password
  ↓
bcrypt.compare()
  ↓
Generate Access Token
  ↓
Generate Refresh Token
  ↓
Store Refresh Token
  ↓
HTTP-only Cookies
  ↓
Authenticated User
```

---

# 🔄 Refresh Token Flow

When the access token needs to be refreshed:

```text
Client
  ↓
Refresh Request
  ↓
Read Refresh Token
  ↓
jwt.verify()
  ↓
Find User
  ↓
Compare Stored Refresh Token
  ↓
Generate New Tokens
  ↓
Update Cookies
  ↓
Authenticated Request
```

---

# 🔒 Password Security

Passwords are never stored as plain text.

During registration:

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Password Hash
      ↓
MongoDB
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Password Hash
      ↓
Valid / Invalid
```

---

# 🧩 Middleware

Middleware is used to handle reusable request processing.

Important middleware includes:

- JWT authentication
- Admin authorization
- Error handling
- Request processing

Example:

```js
router.use(verifyJWT, verifyAdmin);
```

This ensures that every route inside that admin router requires:

1. Authentication
2. Admin authorization

---

# ⚙️ Backend Architecture

ShopAI follows a modular backend architecture.

General request flow:

```text
Client
   │
   ▼
HTTP Request
   │
   ▼
Express Route
   │
   ▼
Middleware
   │
   ├── JWT Authentication
   ├── Admin Authorization
   └── Request Processing
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
   │
   ▼
Controller Response
   │
   ▼
ApiResponse
   │
   ▼
Client
```

---

# 🏗️ Architecture Pattern

The backend follows a modular **MVC-style structure**.

### Routes

Define API endpoints and connect them to controllers.

### Middleware

Handles authentication, authorization, and reusable request processing.

### Controllers

Contain application business logic.

### Models

Define MongoDB schemas and relationships using Mongoose.

### Utils

Provide reusable utilities such as:

- `ApiError`
- `ApiResponse`
- `asyncHandler`
- Token generation utilities

---

# 🗄️ MongoDB & Mongoose

MongoDB is used as the primary database.

Mongoose is used as the ODM.

Main entities include:

```text
User
  ↓
users collection

Product
  ↓
products collection

Order
  ↓
orders collection
```

Products maintain a relationship with the user/admin who created them through:

```text
Product
   │
   └── createdBy → User
```

Orders maintain a relationship with the customer through:

```text
Order
   │
   └── user → User
```

Mongoose features such as `populate()` are used where required to retrieve related information.

---

# 📡 REST API Architecture

The backend follows a REST-style API structure.

## Authentication APIs

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/profile
```

---

# 📦 Product APIs

```text
GET    /api/products
GET    /api/products/:productId

POST   /api/products
PATCH  /api/products/:productId
DELETE /api/products/:productId
```

Product listing supports query parameters such as:

```text
GET /api/products?category=electronics
GET /api/products?search=laptop
GET /api/products?category=electronics&search=laptop
```

---

# 📊 Admin APIs

```text
GET /api/admin/dashboard/stats
```

Admin product APIs include:

```text
GET    /api/products/admin
GET    /api/products/admin/:productId
POST   /api/products
PATCH  /api/products/:productId
DELETE /api/products/:productId
```

> Exact API prefixes depend on the server route configuration.

---

# 🛡️ Error Handling

The backend uses reusable utilities for consistent API errors and responses.

### ApiError

Example:

```js
throw new ApiError(
    404,
    "Product not found"
);
```

### ApiResponse

Example:

```js
return res.status(200).json(
    new ApiResponse(
        200,
        data,
        "Products fetched successfully"
    )
);
```

This keeps API responses consistent across controllers.

---

# ⚡ Async Error Handling

Asynchronous controllers are wrapped using:

```js
asyncHandler()
```

This avoids repeatedly writing `try/catch` blocks inside every controller and allows errors to flow through the centralized error-handling system.

---

# 🔄 Frontend Architecture

The React application follows a component-based architecture.

Main areas include:

```text
components/
context/
layouts/
pages/
routes/
services/
constants/
```

### Components

Reusable UI components.

### Context

Application-level state such as:

- Authentication
- Cart
- Wishlist

### Layouts

Separate layouts for:

- Customer store
- Admin panel

### Pages

Application screens such as:

- Home
- Products
- Product Details
- Cart
- Wishlist
- Checkout
- Orders
- Profile
- Admin Dashboard
- Admin Products
- Admin Orders

### Services

API communication is separated from UI components.

Example:

```text
React Component
      ↓
Product Service
      ↓
Axios API
      ↓
Backend
```

---

# 🛣️ Route Protection

ShopAI uses route guards on the frontend.

## ProtectedRoute

Used for authenticated customer pages.

```text
User
 ↓
Is logged in?
 ↓
Yes → Protected Page
 ↓
No → Login
```

## AdminRoute

Used for admin pages.

```text
User
 ↓
Authenticated?
 ↓
Yes
 ↓
Role === admin?
 ↓
Yes → Admin Page
 ↓
No → Store/Home
```

---

# 📁 Project Structure

```text
ShopAI/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── Navbar/
│   │   │   └── ...
│   │   │
│   │   ├── constants/
│   │   │   ├── routes.js
│   │   │   ├── navbar.config.js
│   │   │   └── ...
│   │   │
│   │   ├── context/
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout/
│   │   │   └── AdminLayout/
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   ├── Products/
│   │   │   ├── ProductDetails/
│   │   │   ├── Cart/
│   │   │   ├── Wishlist/
│   │   │   ├── Checkout/
│   │   │   ├── Orders/
│   │   │   ├── Profile/
│   │   │   └── ...
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   │
│   │   └── services/
│   │       ├── api.service.js
│   │       ├── auth.service.js
│   │       ├── product.service.js
│   │       └── ...
│   │
│   └── package.json
│
├── server/
│   │
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# 🧪 Product Seeding

ShopAI contains a product seeding system for adding sample products to MongoDB.

The product schema requires:

```text
createdBy
```

Therefore the seed process uses a valid user/admin reference.

The seed system is useful during development for quickly creating multiple products instead of manually entering every product through the admin panel.

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Axios | API communication |
| Lucide React | UI icons |
| React Hot Toast | Notifications |
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin requests |
| dotenv | Environment variables |

---

# 📚 Key Concepts Implemented

This project demonstrates practical implementation of:

- React.js
- React Router
- Component-based architecture
- Context API
- REST APIs
- Node.js
- Express.js
- MongoDB
- Mongoose
- Schema & Models
- CRUD operations
- JWT authentication
- Access tokens
- Refresh tokens
- bcrypt
- Authentication
- Authorization
- Protected routes
- Admin authorization
- Middleware
- Async error handling
- Custom API errors
- Custom API responses
- MongoDB relationships
- Mongoose `populate()`
- Search
- Category filtering
- Sorting
- Cart management
- Wishlist management
- Order management
- Admin dashboard
- Responsive UI

---

# 🎯 Project Objective

The main objective of ShopAI was to build a practical full-stack e-commerce application while understanding how different MERN concepts work together in a real application.

Instead of building isolated features, the project connects:

```text
Authentication
      ↓
Authorization
      ↓
React UI
      ↓
REST APIs
      ↓
Business Logic
      ↓
MongoDB
      ↓
Products
      ↓
Cart & Wishlist
      ↓
Checkout
      ↓
Orders
      ↓
Admin Management
      ↓
Dashboard Analytics
```

The project demonstrates how a real-world e-commerce application can be structured using a modular MERN architecture.

---

# 🚀 Future Enhancements

Possible future improvements include:

- Online payment gateway integration
- Product reviews and ratings
- Advanced product filtering
- Pagination
- Product recommendations
- AI-powered product search
- AI product description generation
- AI review summarization
- AI shopping assistant
- Advanced sales analytics
- Revenue charts
- Email notifications
- Forgot/reset password flow
- Product image optimization
- Production deployment
- Automated testing
- API documentation using Swagger/OpenAPI

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone <your-shopai-repository-url>
```

## 2. Navigate to the Project

```bash
cd ShopAI
```

## 3. Install Backend Dependencies

```bash
cd server
npm install
```

## 4. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the server directory.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
```

> Never commit `.env` files or expose secret credentials publicly.

---

# ▶️ Run the Application

## Start Backend

```bash
cd server
npm run dev
```

## Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will start using the development URL provided by Vite.

---

# 🧑‍💻 Development Workflow

A typical feature development flow in ShopAI is:

```text
Requirement
    ↓
Frontend UI
    ↓
Service/API Request
    ↓
Express Route
    ↓
Middleware
    ↓
Controller
    ↓
Mongoose Model
    ↓
MongoDB
    ↓
API Response
    ↓
Frontend State Update
    ↓
UI Update
```

This structure keeps frontend presentation, API communication, backend business logic, and database operations separated.

---

# 📌 Important Notes

- Do not commit `.env` files.
- Admin APIs require an authenticated admin user.
- Product creation requires a valid `createdBy` user reference.
- Authentication uses access and refresh tokens.
- Production cookie configuration should use secure HTTPS settings.
- Seed scripts should be used carefully to avoid unintentionally deleting existing development data.

---

# 👨‍💻 Author

**Nikhil Singh Kiroula**

Full Stack MERN Developer
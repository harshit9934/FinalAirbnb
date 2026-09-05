# 🏠 Airbnb Clone

A full-stack **Airbnb Clone** web application built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

This project replicates the core functionality of an Airbnb-style platform where users can explore properties, create accounts, manage listings, upload images, and add reviews and ratings.

## 🚀 Live Demo

🔗 **https://finalairbnb-8.onrender.com/**

## ✨ Features

* 🔐 User Registration & Login
* 🔑 Session-based Authentication
* 🏠 Browse Property Listings
* 🔍 View Property Details
* ➕ Add New Properties
* ✏️ Edit Property Listings
* 🗑️ Delete Property Listings
* 📸 Image Upload
* ⭐ Reviews & Ratings
* 💰 Property Pricing
* 📍 Property Location
* 🔒 Protected Routes
* 🗄️ MongoDB Database
* 📱 Responsive UI
* 🌐 Live Deployment on Render

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js
* Express Session

### Database

* MongoDB
* Mongoose

### Other Technologies

* Multer
* Git
* GitHub
* Render

## 🏗️ Architecture

The project follows the **MVC (Model-View-Controller)** architecture.

```text
                 Airbnb Clone
                      │
        ┌─────────────┼─────────────┐
        │             │             │
      Model        Controller      View
        │             │             │
    MongoDB       Business Logic    EJS
        │             │             │
        └─────────────┼─────────────┘
                      │
                   Express
                      │
                   Node.js
```

## 📂 Project Structure

```text
Airbnb-Clone/
│
├── controllers/
│   ├── authController.js
│   ├── hostController.js
│   └── ...
│
├── models/
│   ├── User.js
│   ├── Home.js
│   └── ...
│
├── routes/
│   ├── authRouter.js
│   ├── hostRouter.js
│   └── ...
│
├── views/
│   ├── auth/
│   ├── homes/
│   ├── layouts/
│   └── ...
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── uploads/
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## 🔄 How It Works

```text
User
  │
  ▼
Register / Login
  │
  ▼
Session Authentication
  │
  ▼
Browse Properties
  │
  ├── View Details
  │
  ├── Add Property
  │
  ├── Edit Property
  │
  ├── Delete Property
  │
  └── Add Reviews & Ratings
  │
  ▼
MongoDB
```

## 🗄️ Database

MongoDB is used as the primary database with **Mongoose** for data modeling.

The application stores information such as:

* Users
* Property listings
* Property details
* Locations
* Prices
* Images
* Reviews
* Ratings

## 🔐 Authentication

The application implements authentication using:

* User Registration
* User Login
* Express Session
* Protected Routes
* Logout
* Session-based Authorization

## 📸 Image Upload

Property images can be uploaded and associated with individual property listings.

The project uses **Multer** to handle image/file uploads.

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Navigate to the Project

```bash
cd YOUR-REPOSITORY
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 5. Start the Server

```bash
npm start
```

For development:

```bash
npm run dev
```

The application will run locally at:

```text
http://localhost:3000
```

## 🌐 Deployment

The application is deployed on **Render**.

### Live Application

**https://finalairbnb-8.onrender.com/**

## 🎯 What I Learned

Through this project, I gained practical experience with:

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* MVC Architecture
* RESTful Routing
* CRUD Operations
* Authentication & Authorization
* Session Management
* Middleware
* Image Uploads
* Form Handling
* Database Integration
* Git & GitHub
* Deployment with Render

## 🚀 Future Improvements

Some features that can be added in the future:

* 💳 Online Payment Integration
* 🗺️ Interactive Maps
* 🔎 Advanced Search & Filtering
* ❤️ Wishlist/Favorites
* 📧 Email Notifications
* 👤 User Profile Management
* 📱 Improved Mobile Experience
* ☁️ Cloud Image Storage

## 👨‍💻 Author

**Harshit Maurya**

B.Tech Computer Science & Engineering (AI/ML)

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a **⭐ Star** on GitHub!

---

### 🔗 Live Project

**Airbnb Clone:**
https://finalairbnb-8.onrender.com/

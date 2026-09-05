# 🏠 Airbnb Clone

A full-stack **Airbnb-inspired web application** built using **Node.js, Express.js, MongoDB, and EJS**. This project allows users to explore property listings, create accounts, manage listings, and interact with properties through a complete backend-driven web application.

## 🚀 Live Demo

🔗 **[View Live Project](https://finalairbnb-8.onrender.com/)**

## ✨ Features

* 🔐 User Signup & Login
* 🔑 Session-based Authentication
* 🏠 Property/Home Listings
* ➕ Add New Property Listings
* ✏️ Edit & Update Listings
* 🗑️ Delete Listings
* 📸 Image Upload Support
* ⭐ Property Ratings & Reviews
* 💰 Property Pricing
* 📍 Location-based Property Information
* 📖 Detailed Property Pages
* 📱 Responsive User Interface
* 🔒 Protected Routes & Authentication
* 🗄️ MongoDB Database Integration
* 🌐 Deployed on Render

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js
* Express Session

### Database

* MongoDB
* Mongoose

### Other Tools

* Git & GitHub
* Multer
* Render

## 📂 Project Structure

```text
Airbnb-Clone/
│
├── controllers/
├── models/
├── routes/
├── views/
│   ├── layouts/
│   ├── auth/
│   ├── homes/
│   └── ...
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── uploads/
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## 🔄 Application Flow

```text
User
  ↓
Signup / Login
  ↓
Authentication & Session
  ↓
Browse Properties
  ↓
View Property Details
  ↓
Create / Edit / Delete Listings
  ↓
Reviews & Ratings
  ↓
MongoDB
```

## 🗄️ Database

The application uses **MongoDB** with **Mongoose** for storing and managing:

* User information
* Property listings
* Property details
* Reviews
* Ratings
* Images

## ⚙️ Installation & Setup

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

### 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 5. Start the Application

```bash
npm start
```

Or, if you use nodemon:

```bash
npm run dev
```

The application will run on:

```text
http://localhost:3000
```

## 🌐 Live Application

The project is deployed and available online:

**https://finalairbnb-8.onrender.com/**

## 🎯 Project Objective

The main objective of this project was to build a real-world, full-stack web application while learning and implementing:

* RESTful routing
* MVC architecture
* Authentication & authorization
* Session management
* CRUD operations
* MongoDB database operations
* Image/file uploads
* Server-side rendering with EJS
* Express.js middleware
* Deployment using Render

## 📸 Project Preview

The application provides an Airbnb-style experience where users can browse available homes with information such as:

* Property name
* Price per night
* Location
* Rating
* Booking option

## 👨‍💻 Author

**Harshit Maurya**

B.Tech CSE (AI/ML)

### ⭐ If you like this project

Give this repository a **star ⭐** and feel free to explore the code!

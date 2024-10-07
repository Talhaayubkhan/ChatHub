# 🌐 Web-Based Chat Application

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Known Issues and Resolutions](#known-issues-and-resolutions)
- [Group Management](#group-management)
- [Admin Features](#admin-features)
- [Security and Authentication](#security-and-authentication)
- [File Uploads (Cloudinary Integration)](#file-uploads-cloudinary-integration)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Introduction
This project is a **web-based chat application** built using the **MERN stack**, providing real-time messaging, group management, file uploads, and admin controls. It uses **React.js** and **Material UI** for the frontend, ensuring a responsive and user-friendly experience. The backend is built with **Node.js** and **Express.js**, handling authentication, chat functionality, and secure file management.

## 🚀 Features
- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **Admin Functionality**: Admins can manage users, groups, and chats.
- **Real-time Messaging**: Send and receive messages in real time using **Socket.IO**.
- **Group Chat Management**: Create, manage, and participate in group chats.
- **Friend Request System**: Send and accept friend requests.
- **File Uploads**: Upload and share images and files via **Cloudinary**.
- **Notification Badges**: Get notified of unread messages and friend requests using **React Hot Toast**.
- **Data Visualization**: View chat statistics with **React Chart.js 2**.
- **Security**: App secured with **Helmet** and other security measures.
- **Responsive Design**: Designed with **Material UI** for desktop and mobile compatibility.

## 🛠️ Tech Stack
### Frontend:
- **React**: UI framework for building a dynamic user interface.
- **Material UI**: Pre-built React components for a sleek and modern design.
- **React Redux**: State management across the application.
- **React Router DOM**: Navigation for the app.
- **Socket.IO Client**: Real-time communication between users and the server.
- **React Helmet Async**: Handles SEO and metadata for the app.
- **React Chart.js 2**: For rendering charts and visual analytics.
- **React Hot Toast**: Notification system for better UX.
- **Axios**: For making HTTP requests to the backend.

### Backend:
- **Node.js & Express.js**: Backend server and REST API management.
- **Mongoose**: ODM for MongoDB, ensuring efficient data storage and retrieval.
- **Socket.IO**: Enables real-time chat functionalities.
- **bcrypt**: For password hashing and security.
- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **Helmet**: Enhances app security by setting HTTP headers.
- **Cloudinary**: Manages file uploads (e.g., images).
- **Multer**: Handles file uploads on the server side.
- **Express Validator**: Ensures API request validation.
- **Winston**: Logging library to track errors and events.
- **Express Rate Limit**: Protects against brute-force attacks by limiting requests.

## ⚙️ Installation
To set up both the frontend and backend, clone the repository and follow these steps.

### Prerequisites
- **Node.js** and **npm** installed.
- **MongoDB** for local development or access to MongoDB Atlas.
- **Cloudinary** account for file uploads.

### Clone the Repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🔑 Environment Variables
Create a `.env` file in the `backend` directory and configure the following environment variables:

```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🏃‍♂️ Running the Application

1. **Backend**: 
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend**: 
   ```bash
   cd frontend
   npm run dev
   ```

- The backend runs on `http://localhost:5000`.
- The frontend runs on `http://localhost:3000`.

## 📂 Project Structure
```
/chat-app
  ├── /backend
      ├── /config        # Configuration for database and Cloudinary
      ├── /controllers   # Business logic for authentication, messaging, groups, etc.
      ├── /models        # MongoDB models (User, Group, Message, FriendRequest)
      ├── /routes        # API routes for authentication, messaging, and groups
      └── app.js         # Backend entry point
  ├── /frontend
      ├── /src
          ├── /components  # Reusable UI components
          ├── /pages       # Pages like login, register, chat, admin dashboard
          └── App.js       # Main React component
```

## 📜 API Documentation
API documentation is available via **Swagger UI** after running the backend:

```
http://localhost:5000/api-docs
```

## 🐛 Known Issues and Resolutions

1. **File Upload During Registration**:
   - **Issue**: Files were not uploading during the registration process.
   - **Resolution**: This was caused by React's **StrictMode** interfering with the file upload process. We resolved it by adjusting the logic to work properly without StrictMode interference.

2. **Mismatched `userId` vs `_id` in Authentication Middleware**:
   - **Issue**: The app was using `userId` across various parts, which caused issues when identifying users.
   - **Resolution**: Updated the middleware to use `_id` for consistency, preventing mismatch errors.

3. **Friend Request Acceptance Issue**:
   - **Issue**: A mismatch between `userId` and `_id` caused errors when accepting friend requests.
   - **Resolution**: The logic was fixed to consistently use `_id` for user identification during friend requests.

4. **Admin and User Token Separation**:
   - **Issue**: Admin and regular user tokens were the same, leading to potential role-based access issues.
   - **Resolution**: Separated the tokens for admin and normal users, ensuring distinct roles and permissions.

## 🗂️ Group Management
Users can create, join, and manage chat groups. Admins have control over group memberships and permissions.

## 🛡️ Admin Features
Admins have full control over the app, including managing users, groups, and monitoring chat activities.

## 🔒 Security and Authentication
- **JWT**: Token-based authentication for secure access to routes.
- **bcrypt**: Secure password hashing before storing in the database.
- **Helmet**: Provides additional security by setting HTTP headers to protect against vulnerabilities.

## 📂 File Uploads (Cloudinary Integration)
Files like images are uploaded and managed securely using **Cloudinary**, with **Multer** handling file uploads on the backend.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Added new feature'`).
4. Push your branch (`git push origin feature-branch`).
5. Create a pull request.

## 📄 License
This project is licensed under the **MIT License**.

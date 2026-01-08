# 📸 Albumix Frontend

Albumix Frontend is a modern, responsive React-based web application that allows users to manage photo albums, upload images to Cloudinary, and securely interact with a Spring Boot backend using JWT authentication.
This project is designed with **scalability, clean UI, and resume-quality architecture** in mind.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Session-based login (sessionStorage)
- Secure API calls with Authorization headers
- Auto logout on browser close

### 📁 Album Management
- Create, view, update, and delete albums
- Upload multiple photos per album
- View photos with thumbnails
- Download photos securely

### ☁️ Cloudinary Integration
- Upload images directly to Cloudinary via backend APIs
- Multiple image upload support
- Cloudinary gallery view
- Delete previously uploaded images
- Upload progress bar
- File size validation on frontend

### 👤 User Profile
- View profile details
- Change password
- Delete account
- Role-based UI rendering

### 🎨 UI / UX
- Dark / Light mode toggle
- Material UI (MUI) based modern design
- Responsive layout (desktop + mobile)
- Sidebar navigation with breadcrumbs
- Success & error alerts for user actions

---

## 🛠 Tech Stack

### Frontend
- **React**
- **Material UI (MUI)**
- **Axios**
- **Redux**
- **React Router**

### Backend (Integrated)
- Spring Boot
- JWT Authentication
- MySQL
- Cloudinary (Media storage)

---

## 📂 Project Structure

```text
albumix-frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layout/
│   ├── menu-items/
│   ├── store/
│   ├── client/
│   └── routes/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ▶️ Running the Project Locally

### 1️⃣ Install Dependencies

```npm install```

### 2️⃣ Start Development Server

```npm start```

---

## 🔗 Backend Dependency

- This frontend requires the Albumix Spring Boot Backend to be running.
- Backend should expose APIs under:
```/api/v2/**```

---

## ☁️ Cloudinary Flow (Frontend Perspective)
- User selects image(s)
- Frontend validates file size & type
- Image sent to backend using multipart/form-data
- Backend uploads to Cloudinary
- Cloudinary URL & publicId returned
- User can view or delete uploaded image

---

## 👨‍💻 Author

Shankar Kumar
Full Stack Developer

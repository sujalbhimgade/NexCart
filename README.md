# 🛒 NexCart - Full Stack E-Commerce Application

NexCart is a modern full-stack e-commerce platform built using **React**, **Spring Boot**, and **MySQL**. The application provides secure authentication, product browsing, category-based filtering, shopping cart functionality, order management, and an admin dashboard for product and category management.

---

# 🚀 Tech Stack

## Frontend

* React (Vite)
* Material UI (MUI)
* Redux Toolkit
* React Router DOM
* Axios

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Lombok

## Database

* MySQL

---

# ✨ Features

## 👤 User Features

* User Registration & Login
* JWT-based Authentication
* Browse Products
* Search Products
* Category Filtering
* Product Details Page
* Add to Cart
* Update Cart Quantity
* Place Orders
* View Order History
* User Profile Management

## 🛠️ Admin Features

* Add New Products
* Delete Products
* Add Categories
* Delete Categories
* Manage Product Inventory
* View All Products

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sujalbhimgade/NexCart.git
cd NexCart
```

---

## Backend Setup

### Create MySQL Database

```sql
CREATE DATABASE nexcart;
```

### Configure Database

Update:

```properties
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nexcart
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Run Backend

```bash
gradlew.bat bootRun
```

Backend runs on:

```text
http://localhost:9090
```

---

## Frontend Setup

### Install Dependencies

```bash
npm install
```

### Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔒 Authentication

* JWT Token Based Authentication
* Protected Routes
* Role-Based Access Control
* Admin Authorization

---

# 🎯 Future Enhancements

* Product Image Upload
* Payment Gateway Integration
* Wishlist Functionality
* Product Reviews & Ratings
* Email Notifications
* Order Tracking Timeline

---

📸 Screenshots
Landing Page

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/0688d9a4-c409-4bc3-8b8d-0129d303b82d" />

Common Dashboard

<img width="2560" height="1440" alt="Screenshot 2026-06-28 222632" src="https://github.com/user-attachments/assets/22ac125b-1683-4f9f-bc90-4e9e2e079f3b" />
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/5386e2a5-f619-4074-b3ae-804337be9d3c" />


Product Details

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/6f21d04a-3a86-4a1e-b316-100b89d5d0de" />

Cart Page

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/77872d8a-747f-43ac-8730-3fd25748531a" />

Admin Dashboard

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/bb50eabc-7151-44dd-a3c1-6dc7834efdb5" />

---

# 👨‍💻 Author

**Sujal Bhimgade**

* B.Tech Computer Science & Engineering
* Full Stack Java Developer

### GitHub

https://github.com/sujalbhimgade

---

⭐ If you like this project, consider giving it a star.

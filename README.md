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

# 👨‍💻 Author

**Sujal Bhimgade**

* B.Tech Computer Science & Engineering
* Full Stack Java Developer

### GitHub

https://github.com/sujalbhimgade

---

⭐ If you like this project, consider giving it a star.

# NutechPay REST API

NutechPay is a robust backend REST API built with Node.js and Express, utilizing PostgreSQL as its database. It provides essential features for user authentication, balance management, top-ups, digital transactions (such as mobile credit and game vouchers), and the retrieval of service and banner data.

---

## 🚀 Key Features

* **User Registration & Login:** Secure registration and login with JWT (JSON Web Token) authentication.
* **Profile Management:** Users can manage and update their personal profiles, including profile pictures.
* **Balance Operations:** Check current balance and facilitate top-up transactions.
* **PPOB Services & Transactions:** Support for various digital payment services (Pulsa, PPOB) and transaction processing.
* **Public Banners:** Retrieve a list of promotional banners.
* **Protected Routes:** All sensitive endpoints are secured with Bearer Token authentication.

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT (JSON Web Token)**
* **Multer** (for file uploads)

---

## 🧾 API Endpoints

### 🔐 Authentication

* `POST /auth/register` – Register a new user account.
* `POST /auth/login` – Log in and obtain a JWT token.

### 👤 User Profile

* `GET /profile` – Retrieve authenticated user's profile data (requires authentication).
* `PUT /profile` – Update authenticated user's profile data (requires authentication).
* `POST /profile/image` – Upload or change authenticated user's profile picture (requires authentication).

### 💰 Balance & Top-Up

* `GET /balance` – Get authenticated user's current balance (requires authentication).
* `POST /topup` – Initiate a balance top-up (requires authentication).

### 🧾 Transactions

* `GET /transaction/history` – Retrieve authenticated user's transaction history (requires authentication).
* `POST /transaction` – Create a new digital transaction (requires authentication).

### 🖼️ Public Data

* `GET /banner` – Get a list of public banners.
* `GET /services` – Get a list of available services (requires authentication).

---

## 🔧 Installation & Running

### Prerequisites

Before you begin, ensure you have the following installed:

* Node.js
* npm (Node Package Manager)
* PostgreSQL

### Steps

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/ImA08/nutechapp_api](https://github.com/ImA08/nutechapp_api)
    cd nutechpay_api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:** Copy the example environment file and configure your settings (e.g., database connection, JWT secret).

    ```bash
    cp .env.example .env
    ```

4.  **Run the server:**

    ```bash
    npm start
    ```

---

## 📂 Folder Structure


Here's the content in Markdown format, ready for you to copy and paste directly into your README.md file:

Markdown

# NutechPay REST API

NutechPay is a robust backend REST API built with Node.js and Express, utilizing PostgreSQL as its database. It provides essential features for user authentication, balance management, top-ups, digital transactions (such as mobile credit and game vouchers), and the retrieval of service and banner data.

---

## 🚀 Key Features

* **User Registration & Login:** Secure registration and login with JWT (JSON Web Token) authentication.
* **Profile Management:** Users can manage and update their personal profiles, including profile pictures.
* **Balance Operations:** Check current balance and facilitate top-up transactions.
* **PPOB Services & Transactions:** Support for various digital payment services (Pulsa, PPOB) and transaction processing.
* **Public Banners:** Retrieve a list of promotional banners.
* **Protected Routes:** All sensitive endpoints are secured with Bearer Token authentication.

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT (JSON Web Token)**
* **Multer** (for file uploads)

---

## 🧾 API Endpoints

### 🔐 Authentication

* `POST /auth/registration` – Register a new user account.
* `POST /auth/login` – Log in and obtain a JWT token.

### 👤 User Profile

* `GET /profile` – Retrieve authenticated user's profile data (requires authentication).
* `PUT /profile` – Update authenticated user's profile data (requires authentication).
* `POST /profile/image` – Upload or change authenticated user's profile picture (requires authentication).

### 💰 Balance & Top-Up

* `GET /balance` – Get authenticated user's current balance (requires authentication).
* `POST /topup` – Initiate a balance top-up (requires authentication).

### 🧾 Transactions

* `GET /transaction/history` – Retrieve authenticated user's transaction history (requires authentication).
* `POST /transaction` – Create a new digital transaction (requires authentication).

### 🖼️ Public Data

* `GET /banner` – Get a list of public banners.
* `GET /services` – Get a list of available services (requires authentication).

---

## 🔧 Installation & Running

### Prerequisites

Before you begin, ensure you have the following installed:

* Node.js
* npm (Node Package Manager)
* PostgreSQL

### Steps

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/username/nutechpay_api.git](https://github.com/username/nutechpay_api.git)
    cd nutechpay_api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:** Copy the example environment file and configure your settings (e.g., database connection, JWT secret).

    ```bash
    cp .env.example .env
    ```

4.  **Run the server:**

    ```bash
    npm start
    ```

---

## 📂 Folder Structure

├── controllers/
├── routes/
├── services/
├── repositories/
├── middlewares/
├── shared/
│   └── db/pg.js
├── uploads/          # Folder for storing profile pictures
├── app.js
├── .env
├── .env.example
├── README.md


---

## 🧪 API Testing with Swagger

Explore and test the API endpoints using the Swagger documentation:

[https://api-doc-tht.nutech-integrasi.com/](https://api-doc-tht.nutech-integrasi.com/)

---

## 🛡️ Security Features

* **JWT Authentication:** All private routes are secured using JSON Web Tokens.
* **Input Validation:** Robust input validation is implemented on registration, login, and profile endpoints to prevent common vulnerabilities.
* **Secure Photo Upload:** Profile photo uploads are handled securely using Multer, and old profile pictures are automatically deleted when a new one is uploaded (if not the default image).

---

## 📝 Additional Notes

* Ensure the `uploads/` folder exists and has appropriate write permissions for profile picture storage.
* The `.env` file contains sensitive information and is listed in `.gitignore` to prevent it from being committed to the repository.

---

## 👤 Author

**Imanul Aufa** – [@ImA08](https://github.com/ImA08)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.
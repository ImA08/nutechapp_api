# NutechPay REST API

NutechPay adalah REST API backend yang dibangun menggunakan Node.js dan Express, dengan PostgreSQL sebagai database. API ini menyediakan fitur otentikasi, pengelolaan saldo, top up, transaksi digital (seperti pulsa dan voucher game), serta pengambilan data layanan dan banner.

---

## 🚀 Fitur Utama

- ✅ **User Registration & Login** (JWT Auth)
- 💼 **Profile Management**
- 💳 **Check Balance & Top Up**
- 📲 **PPOB Services & Transactions**
- 🖼️ **Public Banners**
- 🔐 **Protected Routes dengan Bearer Token**

---

## 🧾 API Endpoints

### 🔐 Auth
- `POST /auth/register` – Register akun baru
- `POST /auth/login` – Login & mendapatkan JWT token

### 👤 Profile
- `GET /profile` – Mendapatkan data profile user (private)
- `PUT /profile` – Mengubah data profile user (private)
- `POST /profile/image` – Mengubah foto profile (private)

### 💰 Balance
- `GET /balance` – Mendapatkan saldo user
- `POST /topup` – Melakukan top up saldo

### 🧾 Transactions
- `GET /transaction/history` – Mendapatkan riwayat transaksi
- `POST /transaction` – Membuat transaksi baru

### 🖼️ Banner
- `GET /banner` – Mendapatkan list banner (public)

### ⚙️ Services
- `GET /services` – Mendapatkan list layanan (private)

---

## 🔧 Instalasi & Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/username/nutechpay_api.git
cd nutechpay_api


### 2. Install dependencies

```npm install```

### 3. Create a .env file based on .env.example.

```cp .env.example .env```

### 4. Run the server.

```npm start```


📂 Folder Structure
```
├── controllers/
├── routes/
├── services/
├── repositories/
├── middlewares/
├── shared/
│   └── db/pg.js
├── uploads/          # Folder penyimpanan foto profile
├── app.js
├── .env
├── .env.example
├── README.md
```


🧪 API Testing with Swagger
```https://api-doc-tht.nutech-integrasi.com/```


ChatGPT said:
🛡️ Security

Authentication using JWT

Input validation on register, login, and profile endpoints

Photo upload using Multer, and the old file will be deleted if it's not the default image

📝 Additional Notes

Make sure the uploads/ folder exists and has write permission

Ensure the .env file is not committed to Git (it's already listed in .gitignore)

👤 **Author**  
**Imanul Aufa** – [@ImA08](https://github.com/ImA08)


## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

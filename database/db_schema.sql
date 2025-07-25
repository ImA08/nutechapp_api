-- Pastikan ekstensi UUID aktif
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabel users (Induk untuk balances, topups, transactions)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    profile_image TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel services 
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(50) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_icon TEXT,
    service_tariff NUMERIC(18,2) NOT NULL
);

-- 3. Tabel banners 
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(255),
    banner_image TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel balances
CREATE TABLE balances (
    id SERIAL PRIMARY KEY,
    balance NUMERIC(18,2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    CONSTRAINT balances_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. Tabel topups 
CREATE TABLE topups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    top_up_amount NUMERIC(18,2) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    CONSTRAINT topups_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 6. Tabel transactions 
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) NOT NULL UNIQUE, 
    service_code VARCHAR(50),
    service_name VARCHAR(255),
    transaction_type VARCHAR(50) NOT NULL,
    total_amount NUMERIC(18,2) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);
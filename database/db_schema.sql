
-- table users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- table balances
CREATE TABLE balances (
    id SERIAL PRIMARY KEY,
    balance NUMERIC(18,2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    CONSTRAINT balances_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);


--table banners
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(255),
    banner_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- table services
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(255),
    banner_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- table topups
CREATE TABLE topups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    top_up_amount NUMERIC(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    CONSTRAINT topups_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);


-- table transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_code VARCHAR(50),
    service_name VARCHAR(255),
    transaction_type VARCHAR(50) NOT NULL,
    total_amount NUMERIC(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);



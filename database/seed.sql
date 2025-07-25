-- Aktifkan ekstensi UUID jika belum
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bersihkan data lama
TRUNCATE TABLE transactions, banners, topups, users RESTART IDENTITY CASCADE;

-- Insert ke tabel users
INSERT INTO users (id, email, password, name, profile_image, created_at)
VALUES 
  (uuid_generate_v4(), 'user1@example.com', 'hashedpassword1', 'User One', NULL, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), 'user2@example.com', 'hashedpassword2', 'User Two', NULL, CURRENT_TIMESTAMP);

-- Insert ke tabel topups
INSERT INTO topups (id, user_id, top_up_amount, created_at)
SELECT uuid_generate_v4(), id, 100000, CURRENT_TIMESTAMP
FROM users
WHERE email = 'user1@example.com'
UNION ALL
SELECT uuid_generate_v4(), id, 250000, CURRENT_TIMESTAMP
FROM users
WHERE email = 'user2@example.com';

-- Insert ke tabel transactions
INSERT INTO transactions (id, user_id, service_code, service_name, transaction_type, total_amount, created_at, invoice_number)
SELECT uuid_generate_v4(), id, 'SVC001', 'Pulsa 10K', 'TOPUP', 10000, CURRENT_TIMESTAMP, 'INV-001'
FROM users
WHERE email = 'user1@example.com'
UNION ALL
SELECT uuid_generate_v4(), id, 'SVC002', 'Voucher Game 20K', 'TOPUP', 20000, CURRENT_TIMESTAMP, 'INV-002'
FROM users
WHERE email = 'user2@example.com';

-- Insert ke tabel banners
INSERT INTO banners ( banner_name, banner_image)
VALUES
  ('PROMO PAKET DATA','https://example.com/banner1.jpg'),
  ('PROMO VOUCHER GAME','https://example.com/banner2.jpg');



-- Insert ke tabel services

INSERT INTO services (service_code, service_name, service_tariff, service_icon) VALUES 
('PAKET_DATA', 'Paket Data', 50000, 'icon_data.png'),
('VOUCHER_GAME', 'Voucher Game', 75000, 'icon_game.png');
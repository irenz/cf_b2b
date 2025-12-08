-- Database initialization script with hashed admin password
-- Default admin credentials: username=admin, password=admin123
-- Password hash generated using SHA-256

UPDATE admins SET password_hash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' WHERE username = 'admin';

-- Note: The hash above is SHA-256 of 'admin123'
-- You should change the password after first login

-- Insert a test landlord user if it doesn't exist
INSERT INTO users (id, firstname, lastname, email, phone, password, role, enabled)
SELECT 8, 'Test', 'Landlord', 'landlord@test.com', '+1234567890', 'password123', 'LANDLORD', true
WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = 8);

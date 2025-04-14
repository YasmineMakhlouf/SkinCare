-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL UNIQUE,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  user_address VARCHAR(255),
  user_dateOfJoining DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Services Table
CREATE TABLE IF NOT EXISTS services (
  service_id INT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL UNIQUE,
  service_price FLOAT NOT NULL,
  service_description TEXT NOT NULL,
  service_duration INT NOT NULL
);

-- Create Reviews Table with foreign keys to Users and Services
CREATE TABLE IF NOT EXISTS reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  service_id INT,
  review_rating INT,
  review_text TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Appointments Table with foreign keys to Users and Services
CREATE TABLE IF NOT EXISTS appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_date DATETIME NOT NULL,
  user_id INT NOT NULL,
  service_id INT NOT NULL,
  appointment_status ENUM('pending', 'confirmed', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Payments Table with foreign key to Appointments
CREATE TABLE IF NOT EXISTS payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  appointment_id INT NOT NULL,
  payment_amount FLOAT NOT NULL,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Example of Data Insert (You can add more sample data as needed)

-- Insert a sample User
INSERT INTO users (user_name, user_email, user_password, user_phone, user_address)
VALUES ('John Doe', 'john.doe@example.com', 'password123', '1234567890', '123 Street, City');

-- Insert a sample Service
INSERT INTO services (service_name, service_price, service_description, service_duration)
VALUES ('Haircut', 20.00, 'facial', 30);

-- Insert a sample Appointment
INSERT INTO appointments (appointment_date, user_id, service_id, appointment_status)
VALUES ('2025-04-13 10:00:00', 1, 1, 'pending');

-- Insert a sample Payment
INSERT INTO payments (user_id, appointment_id, payment_amount)
VALUES (1, 1, 20.00);

-- Insert a sample Review
INSERT INTO reviews (user_id, service_id, review_rating, review_text)
VALUES (1, 1, 5, 'Great service, very professional!');
users
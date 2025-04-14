# Skincare Backend

The **Skincare Backend** is a RESTful API built with Node.js, Express, Sequelize, and MySQL. It supports user management, service listings, appointment bookings, payments, and review functionalities.  
This backend powers a modern skincare platform, handling all data processing and business logic behind the scenes.

---

## 🔑 Key Features

- Full CRUD API for Users, Services, Appointments, Payments, and Reviews  
- Middleware-based input validation  
- Modular MVC structure (Controllers, Services, Repositories)  
- Sequelize ORM integration with MySQL  
- Error handling and route-level validation  
- Clean, scalable, and maintainable code  

---

## 🛠 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MySQL (v8+)
- Sequelize CLI

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YasmineMakhlouf/SkinCare.git
   cd skincare-backend
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables
Create a .env file in the root directory:

env
Copy
Edit
PORT=3001
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=yasmine
DB_PORT=3306
DB_NAME=skincare_db
Create the database

bash
Copy
Edit
mysql -u root -p -e "CREATE DATABASE skincare_db;"
Run migrations (if applicable)

bash
Copy
Edit
npx sequelize-cli db:migrate
Start the development server

bash
Copy
Edit
npm start
The server will be running at: http://localhost:3001

API Endpoints
User Routes
POST /user – Create new user

GET /user – Get all users

GET /user/:user_id – Get user by ID

GET /user/name/:user_name – Get user by name

GET /user/email/:user_email – Get user by email

PUT /user/:user_id – Update user

DELETE /user/:user_id – Delete user

Service Routes
POST /service – Create a service

GET /service – Get all services

GET /service/:service_id – Get service by ID

GET /service/by-name/:service_name – Get service by name

PUT /service/:service_id – Update service

DELETE /service/:service_id – Delete service

Appointment Routes
POST /appointment – Create an appointment

GET /appointment – Get all appointments

GET /appointment/:appointment_id – Get appointment by ID

PUT /appointment/:appointment_id – Update appointment

DELETE /appointment/:appointment_id – Delete appointment

Review Routes
POST /review – Create a review

GET /review – Get all reviews

GET /review/:review_id – Get review by ID

PUT /review/:review_id – Update review

DELETE /review/:review_id – Delete review

Payment Routes
POST /payment – Create a payment

GET /payment – Get all payments

GET /payment/:payment_id – Get payment by ID

PUT /payment/:payment_id – Update payment

DELETE /payment/:payment_id – Delete payment

Project Structure
bash
Copy
Edit
skincare-backend/
├── config/                 # Sequelize DB config
├── controllers/           # Route controllers
├── models/                # Sequelize models
├── repositories/          # Database query logic
├── routes/                # Express routes
├── services/              # Business logic
├── validators/            # Input validation
├── .env                   # Environment config
├── index.js               # Entry point
└── README.md              # Project documentation

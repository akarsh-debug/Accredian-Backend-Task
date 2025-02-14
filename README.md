# Backend for Referral System

This repository contains the backend implementation of a referral system built using Node.js, Express, Prisma, Nodemailer, and Google API for sending emails. The backend interacts with a MySQL database and provides an API endpoint to create referrals.

## Technologies Used

- **Node.js** - JavaScript runtime for backend development
- **Express.js** - Web framework for building APIs
- **Prisma** - ORM for database interaction
- **MySQL** - Relational database for storing referral data
- **Nodemailer** - Library for sending emails
- **Google API** - Used for sending emails securely

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone (https://github.com/akarsh-debug/Accredian-Backend-Task.git)
   cd Accredian-Backend-Task
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/dbname"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   GOOGLE_REFRESH_TOKEN="your_google_refresh_token"
   EMAIL_SENDER="your_email@example.com"
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Create a Referral

- **Endpoint:** `POST /api/referral`
- **Description:** Creates a new referral and sends an email to the referred person.
- **Request Body:**
  ```json
  {
    "referee_name": "ram",
    "referee_email": "ram@gmail.com",
    "referee_phone": "9876543210",
    "vertical": "Technology",
    "program": "CS",
    "referrer_name": "Akarsh",
    "referrer_email": "akarshkumar@gmail.com",
    "referrer_phone": "1234567890"
  }
  ```
- **Response:**
  ```json
  {
    "status": 201,
    "message": "Referral created successfully!",
  }
  ```


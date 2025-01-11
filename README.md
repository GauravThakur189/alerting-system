# Alerting System

The **Alerting System** monitors failed POST requests from IP addresses. If an IP address exceeds a defined failure threshold, the system:

- Logs the failed attempts in the database.
- Updates IP analytics for tracking.
- Sends an email alert to the admin.

This project includes endpoints for logging failed attempts (POST) and retrieving IP analytics (GET).

---

## Features

- Tracks failed POST requests from various IPs.
- Logs failure attempts and timestamps in the database.
- Updates IP analytics with failure counts and timestamps.
- Sends email alerts to admins when a failure threshold is exceeded.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Email Service:** Nodemailer
- **Environment Configuration:** dotenv

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
EMAIL_USER=your_email@gmail.com         # Your email address
EMAIL_PASS=your_app_password           # App-specific password (for Gmail, generate from security settings)
ADMIN_EMAIL=admin_email@gmail.com      # Admin's email address for receiving alerts
MONGO_URI=your_mongodb_connection_uri  # MongoDB connection string
PORT=5000                              # Port to run the server
```

---

## Installation and Setup

Follow these steps to run the project locally:

### Clone the Repository:
```bash
git clone https://github.com/your-username/alerting-system.git
cd alerting-system
```

### Install Dependencies:
```bash
npm install
```

### Configure Environment Variables:
Create a `.env` file in the root directory and add the required variables.

### Start the Server:
```bash
npm start
```
The server will start running on the port specified in your `.env` file (default: http://localhost:5000).

---

## API Documentation

### 1. Log Failed Request

**Endpoint:** `/api/failed-attempts`  
**Method:** `POST`  
**Description:** Logs a failed request from a client IP. If the failure threshold is exceeded, it triggers an email alert.

**Request Body:**
```json
{
  "ip": "192.168.1.1",
  "reason": "Invalid credentials"
}
```

**Response:**
- **Success (Below Threshold):**
```json
{
  "message": "Failure logged successfully."
}
```
- **Success (Threshold Exceeded):**
```json
{
  "message": "Failure logged. Admin has been alerted."
}
```

### 2. Get IP Analytics

**Endpoint:** `/api/ip-analytics`  
**Method:** `GET`  
**Description:** Retrieves analytics data for all monitored IPs.

**Response:**
```json
[
  {
    "ip": "192.168.1.1",
    "failureCount": 6,
    "lastFailureTime": "2025-01-10T14:30:00.000Z"
  },
  {
    "ip": "192.168.1.2",
    "failureCount": 3,
    "lastFailureTime": "2025-01-10T14:00:00.000Z"
  }
]
```

---

## How It Works

### POST `/api/failed-attempts`:
1. Logs the failed request.
2. Checks the failure count for the IP in the last 10 minutes.
3. If the count exceeds the threshold (default: 5), it updates the `IPAnalytics` database and sends an alert email.

### GET `/api/ip-analytics`:
1. Retrieves all IP analytics data stored in the `IPAnalytics` database.

---

## Test Cases

1. **Log a Failed Request**  
   - **Input:** Send a POST request to `/api/failed-attempts` with valid IP and reason.
   - **Expected Result:** Failure is logged successfully, and the response confirms it.

2. **Exceed Failure Threshold**  
   - **Input:** Trigger 6+ POST requests for the same IP within 10 minutes.
   - **Expected Result:** An email alert is sent to the admin, and the database is updated.

3. **Retrieve IP Analytics**  
   - **Input:** Send a GET request to `/api/ip-analytics`.
   - **Expected Result:** Returns a list of all logged IPs with their failure counts and timestamps.

---

## Expected Results

### Admin Email Example:
**Subject:** Alert: Excessive Failed Requests Detected  
**Body:**
```plaintext
Alert: The IP address 192.168.1.1 has failed 6 POST requests within the monitoring period. Please check the IP analytics database for more details.
```

### Database Entries:

**FailedAttempt:**
```json
{
  "_id": "unique_id",
  "ip": "192.168.1.1",
  "reason": "Invalid credentials",
  "timestamp": "2025-01-10T14:00:00.000Z"
}
```

**IPAnalytics:**
```json
{
  "_id": "unique_id",
  "ip": "192.168.1.1",
  "failureCount": 6,
  "lastFailureTime": "2025-01-10T14:00:00.000Z"
}
```

---

## Dependencies

- **Nodemailer:** For email notifications.
- **dotenv:** For environment variable management.
- **mongoose:** For MongoDB database interactions.
- **express:** For routing and server setup.

Install all dependencies with:
```bash
npm install
```

---

## Contact

For any issues or suggestions, feel free to reach out:

- **Author:** Gaurav Singh  
- **Email:** your_email@gmail.com

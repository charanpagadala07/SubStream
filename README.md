# Subscription Management System

## Overview

The **Subscription Management System** is a backend application built to manage user subscriptions, authenticate users securely, and provide enhanced bot detection using **ArcJet** for security-as-code. It integrates with **MongoDB Atlas** for data storage and leverages **JWT** for authentication. The system is designed to ensure only legitimate users access the platform while handling abnormal behavior with the help of **ArcJet**'s bot detection capabilities.

## Features

- **User Authentication** with **JWT** (JSON Web Tokens) for secure login and token management.
- **MongoDB Atlas** for cloud-based database management and storage.
- **Subscription Management** to manage user subscriptions.
- **ArcJet Integration** for real-time bot detection and security-as-code.
- **Request Rate Limiting** to prevent abuse by ensuring fair usage of the platform.

---

## Setup Instructions

Follow these steps to set up the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16.x or higher)
- **MongoDB Atlas** account (for cloud database hosting)
- **ArcJet** account (for bot detection and security)

### Step 1: Clone the Repository

Clone the repository to your local machine by running:

```bash
git clone  https://github.com/charanpagadala07/Subscription-Mangement-System.git
```

### Step 2: Install dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd subscription-project
npm install
```

### Step 3 : Setup your .env file
Instead of using the .env file, this project uses .env.development.local for local development configurations
```bash
PORT = 

NODE_ENV = 'development'

DB_URI = "<mongodb-url"

JWT_SECRET = ''

JWT_EXPIRES_IN = 

ARCJET_KEY = 
ARCJET_ENV= 'development'

```
### Step 4 : Run the application
To start the server in development mode using nodemon, run the following command:
```bash
npm run dev
```


## Why ArcJet?

ArcJet is integrated into this system to provide **security-as-code**. Here's why it is an excellent choice:

- **Bot Detection**: ArcJet monitors abnormal user behaviors, such as excessive requests from the same IP or user, and flags potential bot activity.
- **Real-time Alerts**: The system alerts you whenever suspicious behavior is detected, allowing you to take immediate action.
- **Easy Integration**: ArcJet provides an easy way to integrate bot detection and security features with minimal configuration.
- **Customizable Security**: Adjust the security configuration based on your environment (e.g., development, production).
- **Scalable**: ArcJet scales seamlessly with your app, ensuring security regardless of traffic volume.

## How to Use ArcJet

1. **Sign Up for ArcJet**: First, sign up for an ArcJet account at [ArcJet's website](https://www.arcjet.com).
2. **Obtain Your ArcJet API Key**: Once you've signed up, you'll be issued an API key that you'll use to authenticate your application.
3. **Add the ArcJet Key to Your `.env` File**: Open the `.env.development.local` file you created earlier and insert your ArcJet API key:

    ```bash
    ARCJET_KEY='your-arcjet-api-key-here'
    ```

4. **ArcJet in Action**: Once configured, ArcJet will start monitoring user traffic, detecting potential bots, and reporting abnormal activities to keep your application secure.


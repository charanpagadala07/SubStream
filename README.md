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
git clone https://github.com/yourusername/subscription-project.git

### Step 2: Install dependencies


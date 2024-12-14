# Online LPO System for the Oil and Gas Industry

This project is a **MERN (MongoDB, Express, React, Node.js)** application that facilitates seamless product order placement and management for the oil and gas industry. The system supports PDF generation, file uploads, and email notifications, enabling efficient handling of Local Purchase Orders (LPOs).

## Features

### Core Functionalities
- **File Upload**: Upload LPO and payment receipts using a user-friendly interface.
- **PDF Management**: Save and process uploaded PDFs and invoices on the server.
- **Email Notifications**: Automatically send email notifications with attachments for new orders.
- **Order Tracking**: Track and manage orders with comprehensive records stored in a MongoDB database.

## Technology Stack

### Frontend
- **React**: For building the user interface.
- **Axios**: For handling HTTP requests.
- **React Router**: For navigation and routing.

### Backend
- **Node.js**: As the runtime environment.
- **Express**: For handling API endpoints and server logic.
- **Multer**: For handling file uploads.
- **Nodemailer**: For sending emails with attachments.
- **MongoDB**: For storing order and user data.

## Directory Structure

```
project-root
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   └── styles
│   ├── public
│   └── package.json
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── utils
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup

### Prerequisites
- Node.js installed
- MongoDB instance (local or cloud-based)
- Gmail account for email notifications

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the following:
   ```
   PORT=4000
   MONGO_URI=<Your MongoDB Connection String>
   EMAIL_USER=<Your Gmail Address>
   EMAIL_PASS=<Your Gmail App Password>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Hosting
- The application can be hosted on **DigitalOcean** or other hosting platforms.
- Ensure that environment variables are configured correctly on the hosting platform.

## API Endpoints

### Upload PDF and Invoice
- **POST** `/upload-pdf`
- Upload LPO and invoice files.

### Send Email
- **POST** `/send-email`
- Sends an email with the uploaded LPO and invoice as attachments.

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For queries or suggestions, reach out:
- **LinkedIn**: https://www.linkedin.com/in/jacobkiage/




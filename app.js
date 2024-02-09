const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'https://saratha9.github.io',
  optionsSuccessStatus: 200,
}));

// Firebase configuration
const serviceAccount = require('path/to/your/firebase-service-account-key.json');
const firebaseConfig = {
  // Your Firebase configuration here...
  apiKey: "AIzaSyCcsYNBdKxXjgRgu3ta3yvaqg6BXmC9lPk",
  authDomain: "sar-folio-1c222.firebaseapp.com",
  projectId: "sar-folio-1c222",
  storageBucket: "sar-folio-1c222.appspot.com",
  messagingSenderId: "143147205696",
  appId: "1:143147205696:web:85753226b639050dd88ba5",
  measurementId: "G-Q97N8HJZN3"
}; 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

// Nodemailer configuration...
// ... (Same as before)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Firebase Firestore reference
const db = admin.firestore();

// Express route for handling form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save data to Firestore
    await db.collection('contacts').add({
      name,
      email,
      message,
    });
    // Send email...
    // ... (Same as before)

    res.status(200).send('Form submitted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server...

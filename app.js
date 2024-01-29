// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});

// Initialize Firebase
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

app.post('/api/contact', async (req, res) => {
    const formData = req.body;

    // Store data in Firebase
    const dataRef = db.ref('formData');
    dataRef.push(formData);

    // Send email using Nodemailer
    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL, // Replace with your recipient email
        subject: 'New Form Submission',
        html: `<p>Name: ${formData.name}</p>
               <p>Email: ${formData.email}</p>
               <p>Message: ${formData.message}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error submitting form');
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

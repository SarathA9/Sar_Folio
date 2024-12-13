const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();     
       
const app = express();   
const port = process.env.PORT || 3000; 
 
app.use(cors()); // Enable CORS 
   
// Middleware to parse from data
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static('public'));  
// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  }); 
  // Email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).send('Error sending email. Please try again later.');
    }
    console.log('Email sent: ' + info.response);
    res.send('Form submitted successfully!');
  });
}); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

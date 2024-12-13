import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(bodyParser.json());


app.use(cors({ origin: 'http://localhost:3000' }));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,

    },
  });

app.post('/send-email', (req, res) => {
  const { stylist, date, time, service, email } = req.body;

  const mailOptions = {
    from: email,
    to: 'aboulouafa.reda.contact@gmail.com',
    subject: 'New Barber Shop Reservation',
    text: `Reservation Details:
    Stylist: ${stylist}
    Service: ${service}
    Date: ${date}
    Time: ${time}
    Client Email: ${email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error.message);
    }
    res.send('Email sent: ' + info.response);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
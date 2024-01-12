const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');


const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
  try {
    let requestBody = req.body;
    const {  email, password } = requestBody //Destructuring
    const hashedPassword = await bcrypt.hash(password, 10);
     //--------------------creating user document-------------------------
     const newUser = await userModel.create(requestBody)
        
     return res.status(201).send({ status: true, message: "user created succesfully.", data: newUser })
} catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting all users which present in database
router.get('/alluser-info',  async (req, res) => {
    try {
      const user = await userModel.find();
  if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
       res.status(200).json({status: true, message: 'User Details', data: user});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //get user by its id
  router.get('/getUserbyid/:userId',async function (req, res) {
    try {
        let userId = req.params.userId;
        const user = await userModel.findOne({ _id: userId })
        return res.status(200).send({ status: true, message: 'User Details', data: user })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
})

// user Login
router.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await userModel.findOne({ email: email, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not correct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret key
  // The same secret key  will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      
    },
    "sonupk"//secret key
  );
  //res.setHeader("x-auth-token", token);
  res.send({ status: true, message: "user login succesfully.", data: token });
  
});





// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist with this email ' });
    }

    const resetToken = jwt.sign({ userId: user._id }, 'sonupk', { expiresIn: '1h' });

    // Send reset password email
    const transporter = nodemailer.createTransport({
      // Configure your email service (SMTP details)
      service: 'gmail',
      auth: {
        user: 'your-email.com',
        pass: 'your-password'
      }
    });

    const mailOptions = {
      from: 'your-email.com',//add your email to run this api
      to: email,
      subject: 'Reset Password',
      html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the following link, or paste this into your browser to complete the process:</p>
            <p><a href="http://localhost:3000/auth/forgot-password/${resetToken}">Reset Password Link</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send reset password email' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Reset password instructions sent' });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist with this email' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



  

module.exports = router;

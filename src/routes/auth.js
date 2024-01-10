const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    let requestBody = req.body;
    const {  email, password } = requestBody //Destructuring
    // const existingUser = await User.findOne({email: userData.email ,password: userData.password});

    // if (existingUser) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    //const hashedPassword = await bcrypt.hash(password, 10);
     //--------------------creating college documents-------------------------
     const newUser = await userModel.create(requestBody)
        
     return res.status(201).send({ status: true, message: "user created succesfully.", data: newUser })

    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user-info',  async (req, res) => {
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
  

module.exports = router;

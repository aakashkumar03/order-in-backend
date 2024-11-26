const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const User = require('./schema/user');

app.use(cors());
env.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    const { username,phone , email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        phone,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message:"User sign-up process is successful" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Login a user
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, 'your-secret-key');
      res.status(200).json({ user:email,token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



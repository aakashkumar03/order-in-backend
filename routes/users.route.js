const express = require("express");
const router = express.Router();
const User = require("../schema/user.schema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const auth = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
    try {
        
        const { email, password, name, phone } = req.body;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
          return res.status(201).json({ status:201,message: "Email already taken" });
          }
          else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const userId=Date.now()
            const newUser = await new User({
              userId:userId, 
              email:email, 
              password: hashedPassword, 
              name:name,
              gender:'',
              country:'', 
              phone:phone }).save();

            const token = jwt.sign({ email,userId }, process.env.JWT_SECRET);
            return res.status(200).json({ status:200,message: "User created successfully",userId });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const userId= user.userId
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const token = jwt.sign({ email,userId }, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token, userId});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get('/userProfile',auth, async (req, res) => {
  try {

      const user = await User.findOne({ userId:req.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/userProfile',auth, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = Number(decoded.userId); 

    const { name, email, gender ,country } = req.body;

    
    const updatedUser = await User.findOneAndUpdate(
      { userId: userId }, 
      {
        name,
        email,
        country,
        gender
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;

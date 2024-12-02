const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId:{
    type:Number,
    unique:true,
    required:true
  },
  name: { 
    type: String, 
    required: true, 
  },
  phone : { 
    type: Number, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  gender:{
    type:String,
  },
  country:{
    type:String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
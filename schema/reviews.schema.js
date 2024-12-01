const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true, 
  },
  star : { 
    type: Number, 
    required: true, 
  },
  location: { 
    type: String, 
    required: true, 
  },
  review: { 
    type: String, 
    required: true 
  },
  date:{
    type:Date,
    required:true
  }
});

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
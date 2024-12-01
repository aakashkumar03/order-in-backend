const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardId:{
    type:Number,
    require:true,
    unique:true
  },
  userId:{
    type:Number,
    required:true
  },
  cardNumber: { 
    type: Number,
    required: true,
    minlength: 16,
    maxlength: 16 
  },
  expireDate : { 
    type: String, 
    required: true,
  },  
  cvv: { 
    type: Number, 
    required: true,
    minlength: 3,
    maxlength: 3
  }, 
  nameOnCard: { 
    type: String, 
    required: true 
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
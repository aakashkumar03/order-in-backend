const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardNumber: { 
    type: Number, 
    required: true, 
  },
  expireDate : { 
    type: String, 
    required: true,
  },
  cvv: { 
    type: Number, 
    required: true, 
  },
  nameOnCard: { 
    type: String, 
    required: true 
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true
  },
  restaurantId:{
    type:Number,
    required:true
  },
  retaurantImageLink:{
    type:String,
    required:true
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
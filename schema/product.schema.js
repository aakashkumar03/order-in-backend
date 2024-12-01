const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  restaurantId:{
    type:Number,
    required:true,
  },
  catagory:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  productImage:{
    type: String,
    required: true
  },
  productId:{
    type: Number,
    required: true
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
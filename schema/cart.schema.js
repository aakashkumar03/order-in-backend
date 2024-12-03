const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartId:{
    type:Number,
    required:true
  },
  userId:{
    type:Number,
  },
  items:[
    {
        productId:{
            type:Number,
          },
        quantity:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
          type:Number,
          required:true
        }
    }
  ],
  totalAmount:{
    type:Number,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
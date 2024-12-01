const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId:{
    type:Number,
    required:true
  },
  userId:{
    type:Number,
    required:true
  },
  items:[
    {
        productId:{
            type:Number,
            required:true
          },
        quantity:{
            type:Number,
            required:true
        },
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
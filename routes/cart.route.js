const express = require("express");
const router = express.Router();
const Cart = require("../schema/cart.schema")
const { generateRandom5DigitNumber } = require('../utils/constants')


router.post('/create', async (req, res) => {
    try {
        const {items,totalAmount} = req.body;
      
        const newCart = new Cart({ 
            cartId:generateRandom5DigitNumber(),
            items:items,
            totalAmount:totalAmount,
            });
          const savedOrder = await newCart.save();
          res.status(201).json(savedOrder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
 
  router.get('/getCart/:cartId',async (req, res) => {
    try {  
      const cartDetails = await Cart.find({cartId:req.params.cartId})
      
      if (!cartDetails) {
        return res.status(404).json({ message: 'Cart not found'});
      }
      res.json(cartDetails[0]).status(200);
    } catch (err) {
      res.status(500).json({   
   error: err.message });
    }
  });
  

  
  module.exports = router;
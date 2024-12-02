const express = require("express");
const router = express.Router();
const Address = require("../schema/address.schema")
const User = require("../schema/user.schema")
const { generateRandom5DigitNumber } = require('../utils/constants')
const auth = require('../middlewares/auth')


router.post('/create',auth, async (req, res) => {
    try {
      const { state,city,pincode,phone,fullAddress,isDefault='' } = req.body;
      const userDetails = await User.find({userId:req.userId})
      console.log(userDetails);
      
      
        const newAddress = new Address({ 
            addressId:generateRandom5DigitNumber(),
            userId:req.userId,
            name:userDetails[0].name,
            state:state, 
            city:city,
            pincode:pincode,
            phone:phone,
            fullAddress:fullAddress,
            isDefault:isDefault
         });
          const savedAddress = await newAddress.save();
          res.status(201).json(savedAddress);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
 
  router.get('/allAddress', auth,async (req, res) => {
    try {  
      const cardDetails = await Address.find({userId:req.userId})
      
      if (!cardDetails) {
        return res.status(404).json({ message: 'Card not found'});
      }
      res.json(cardDetails).status(200);
    } catch (err) {
      res.status(500).json({   
   error: err.message });
    }
  });
  
  // Update a card
  router.post('/edit',auth, async (req, res) => {
    try {
        const { state,city,pincode,phone,fullAddress,addressId } = req.body;
        console.log(req.body);
        
        const updatedAddress = await Address.findOneAndUpdate({ addressId: addressId }, {
            state:state, 
            city:city,
            pincode:pincode,
            phone:phone,
            fullAddress:fullAddress
          }, { new: true });
          
          
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not Updated' });
        }
        res.json(updatedAddress).status(200);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  });


  router.post('/delete',auth, async (req, res) => {
    try {
        const deleteAddress = await Address.deleteOne({addressId:req.body.id})
        
        if (deleteAddress.deletedCount==0) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json({message:"Address deleted sucessfully"}).status(200);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  });
  

  
  module.exports = router;
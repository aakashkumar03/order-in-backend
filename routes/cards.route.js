const express = require("express");
const router = express.Router();
const Cards = require("../schema/cards.schema")
const { generateRandom5DigitNumber } = require('../utils/constants')
const auth = require('../middlewares/auth');
const User = require("../schema/user.schema");


router.post('/create',auth, async (req, res) => {
    try {
      const { cardNumber, expireDate, cvv, nameOnCard,cardId } = req.body;
      
      const cardExist = await Cards.find({cardId:cardId})
      const userDetails = await User.find({userId:req.userId})

      if (cardExist.length==0) {
        const newCard = new Cards({ 
            cardId:generateRandom5DigitNumber(),
            userId:req.userId,
            name:userDetails.name,
            cardNumber:cardNumber, 
            expireDate:expireDate,
            cvv:cvv,
            nameOnCard:nameOnCard });
          const savedCard = await newCard.save();
          res.status(201).json(savedCard);
      }else{
        const updatedCard = await Cards.findOneAndUpdate({cardId:cardId}, {
          userId:req.userId,
          name:userDetails.name,
          cardNumber:cardNumber, 
          expireDate:expireDate,
          cvv:cvv,
          nameOnCard:nameOnCard
        }, { new: true });
        res.status(200).json(updatedCard);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
 
  router.get('/allCards', auth,async (req, res) => {
    try {  
      const cardDetails = await Cards.find({userId:req.userId})
      
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
  router.put('/update/:id',auth, async (req, res) => {
    try {
        const { cardNumber, expireDate, cvv, nameOnCard } = req.body;
        
        const cardId=Number(req.params.id)
        const updatedCard = await Cards.findOneAndUpdate({ cardId: cardId }, {
            userId:req.userId,
            cardNumber:cardNumber, 
            expireDate:expireDate,
            cvv:cvv,
            nameOnCard:nameOnCard
          }, { new: true });
          
          
        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(updatedCard).status(200);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  });


  router.post('/delete',auth, async (req, res) => {
    try {
        const deleteCard = await Cards.deleteOne({cardId:req.body.cardId})
        
        if (deleteCard.deletedCount==0) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json({message:"Card deleted sucessfully"}).status(200);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  });
  

  
  module.exports = router;
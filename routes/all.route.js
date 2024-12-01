const express = require("express");
const router = express.Router();
const Restaurant = require("../schema/restaurant.schema")
const Product = require("../schema/product.schema")
const Reviews = require("../schema/reviews.schema")
const Order = require("../schema/order.schema")
const User = require("../schema/user.schema")
const Cards = require("../schema/cards.schema")

const { generateRandom5DigitNumber } = require('../utils/constants')
const auth = require('../middlewares/auth')

router.post('/createRestaurant',auth, async (req, res) => {
    try {
      const { restaurantName,restaurantId,retaurantImageLink} = req.body;
      
      
        const newRestaurant = new Restaurant({ 
            restaurantName:restaurantName,
            restaurantId:restaurantId,
            retaurantImageLink:retaurantImageLink
         });
          const savedRestaurant = await newRestaurant.save();
          res.status(201).json(savedRestaurant);
      
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/allrestaurant', auth,async (req, res) => {
    try {  
      const restaurantDetails = await Restaurant.find()
      
      if (!restaurantDetails) {
        return res.status(404).json({ message: 'Card not found'});
      }
      res.json(restaurantDetails).status(200);
    } catch (err) {
      res.status(500).json({   
   error: err.message });
    }
  });

router.get('/productPage',auth, async (req, res) => {
    try {
      
      const [ burger ,fries,coldDrink,reviews ] =  await Promise.all([
        Product.find({catagory:"Burger"}),
        Product.find({catagory:"Fries"}),
        Product.find({catagory:"Cold Drink"}),
        Reviews.find()
      ]) 

      const response = {
        burgerProductList:burger,
        friesProductList:fries,
        coldDrinkProductList:coldDrink,
        reviews:reviews
      };
      
      
      res.json({message:"All the details required for Prodect page.",result:response}).status(200);
      
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/createProduct',auth, async (req, res) => {
    try {
      const { restaurantName,restaurantId,catagory,name,desc,price,productImage} = req.body;
      
      
        const newProduct = new Product({ 
            restaurantName:restaurantName,
            restaurantId:restaurantId,
            productId:generateRandom5DigitNumber(),
            catagory:catagory,
            name:name,
            desc:desc,
            price:price,
            productImage:productImage});
          const savedProduct = await newProduct.save();
          res.status(201).json(savedProduct);
      
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.post('/createReviews',auth, async (req, res) => {
    try {
      const { userName,star,location,review} = req.body;
      
      
        const newProduct = new Reviews({ 
            userName:userName,
            star:star,
            location:location,
            date:Date.now(),
            review:review,
            });
          const savedProduct = await newProduct.save();
          res.status(201).json(savedProduct);
      
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/orderComplete',auth, async (req, res) => {
    try {
      const {items,totalAmount} = req.body;
      
      
        const newOrder = new Order({ 
            userId:req.userId,
            orderId:generateRandom5DigitNumber(),
            items:items,
            totalAmount:totalAmount,
            });
          const savedOrder = await newOrder.save();
          res.status(201).json(savedOrder);
      
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  module.exports = router;

  router.get('/profilePage',auth, async(req,res)=>{
    try {
      const userId =req.userId;

      const [userDetails ,cardDetails] = await Promise.all([
        User.findOne({ userId:userId }),
        Cards.find({userId:userId})
      ])

      const response ={
        userDetails:userDetails,
        cardDetails:cardDetails
      }

      res.json({message:"All the details required for Profile page.",result:response}).status(200);
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  })

  router.post('/checkoutPage',auth, async(req,res)=>{
    try {
      const {orderId} =req.body;

      const orderDetails = await Order.find({orderId:orderId})


      res.json({message:"All the details required for Checkout page.",result:orderDetails}).status(200);
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  })
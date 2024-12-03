const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users.route");
const cardsRoutes = require("./routes/cards.route");
const addressRoutes = require("./routes/address.route");
const cartRoute = require("./routes/cart.route")
const allRoutes = require("./routes/all.route");

app.use(cors());
env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/healthCheck", (req, res) => {
  res.send("Working properly");
});
app.use("/api/user", userRoutes);
app.use("/api/card", cardsRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/all", allRoutes);
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



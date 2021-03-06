const express = require('express');

const shoppingCart = require('./cartRoutes');

const app = express();

app.use(express.json());

app.listen(3000, console.log("listening on port 3000"));

app.use("/cart-items", shoppingCart);
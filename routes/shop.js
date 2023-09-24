const express = require("express");
const router = express.Router();
const path = require("path");
const {products} = require("./admin");


router.get("/",(req, res) => {
  res.render('shop', {prods: products, title: 'Shop'});
})

module.exports = router;




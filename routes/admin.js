const express = require("express");
const router = express.Router();

const products = [];

router.get("/add-product",(req,res) => {
  res.render('add-product', {pageTitle:"Add Product"});
})

router.post("/products", (req,res) => {
  products.push({title: req.body.title});
  res.redirect('/');
})

module.exports = {router, products};


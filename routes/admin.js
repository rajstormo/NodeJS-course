const express = require("express");
const { type } = require("os");
const router = express.Router();
const path = require("path");

const products = [];

router.get("/add-product",(req,res) => {
  res.sendFile(path.join(__dirname,'..','views','add-product.html'));
})

router.post("/products", (req,res) => {
  products.push({title: req.body.title});
  res.redirect('/');
})

module.exports = {router, products};


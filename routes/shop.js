const express = require("express");
const router = express.Router();
const path = require("path");
const {products} = require("./admin");

console.log("shop start: " + products);

router.get("/",(req, res) => {
  console.log("shop: " + products);
  res.sendFile(path.join(__dirname,'..','views','shop.html'));
})

module.exports = router;




const express = require("express");
const router = express.Router();

const productController = require("../controllers/products");

router.get("/add-product", productController.addNewProduct);

router.post("/add-product", productController.handleNewProduct);

module.exports = router;


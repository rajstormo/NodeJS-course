const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/add-product", adminController.addNewProduct);

router.post("/add-product", adminController.handleNewProduct);

router.get('/edit-product/:productID', adminController.getEditProduct);

router.post('/edit-product/:productID', adminController.postEditProduct);

router.post('/delete-product/:productID', adminController.deleteProduct);

router.get("/products", adminController.getProducts);

module.exports = router;


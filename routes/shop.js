const express = require("express");
const router = express.Router();

const shopController = require('../controllers/shopController');

router.get("/", shopController.getIndex);

router.get('/products', shopController.getProducts);

// dynamic route 
router.get('/product/:productID', shopController.getProductDetails);

router.get('/cart',shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart/:productID', shopController.deleteCartItem);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);


module.exports = router;





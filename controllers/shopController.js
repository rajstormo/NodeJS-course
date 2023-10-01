
const Product = require("../models/product");
const Cart = require("../models/cart");

const getIndex = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render("./shop/index", {
      prods : products,
      pageTitle: "Shop"
    });
  } catch(err) {
    console.log(err);
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render('./shop/product-list', { prods: products, pageTitle: 'Products' });
  }
  catch(err) {
    console.log(err);
  }
}

const getProductDetails = async(req, res) => {
  const id = req.params.productID;
  const product = await Product.findProductByID(id);
  res.render('./shop/product-detail', {
    product : product,
    pageTitle : product.title
  });
}

const getCart = async (req, res) => {
  const cart = await Cart.fetchProducts();
  // Promise.all() waits for all the promises to get resolved
  const cartItems = await Promise.all(cart.products.map(async (curr_product) => {
    const product = await Product.findProductByID(curr_product.id);
    return {...product, qty: curr_product.qty};
  }));

  res.render("./shop/cart", {
    pageTitle: "Cart",
    cartItems: cartItems,
    totalPrice : cart.totalPrice
  });
}

const postCart = async (req, res) => {
  const {productID} = req.body;
  const productDetails = await Product.findProductByID(productID);
  Cart.addProduct(productID, productDetails.price);
  res.send("received");
}

const deleteCartItem = (req, res) => {
  const {productID} = req.params;
  const cart = new Cart();
  cart.deleteProduct(productID);
  res.redirect('/cart');
}


const getOrders = (req, res) => {
  res.render("./shop/orders", {
    pageTitle: "Your Orders"
  });
}

const getCheckout = (req, res) => {
  res.render("./shop/checkout", {
    pageTitle: 'Checkout'
  });
}


module.exports = {getIndex, getProducts, getCart, getOrders, getCheckout, getProductDetails, postCart, deleteCartItem};
const fs = require("fs");
const path = require("path");
const Product = require("./product");
const { totalmem } = require("os");

class Cart {
  static async fetchProducts() {
    const fileName = path.join(__dirname,'..','data','cart.json');
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (!err)
          resolve(JSON.parse(data));
        else 
          reject(err);
      });
    }); 
  }
  
  static addProduct(id, productPrice) {
    // fetch previous cart details
    fs.readFile(path.join(__dirname,'..','data','cart.json'), (err, data) => {
      let cart = {products: [], totalPrice: 0};
      if (!err) {  
        cart = JSON.parse(data);
      }

      // find if product exists;
      const existingProductIndex = cart.products.findIndex(curr_prod => curr_prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      
      console.log(existingProduct);
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = {...existingProduct, qty: existingProduct.qty + 1};
        cart.products[existingProductIndex] = updatedProduct;
      }
      else {
        console.log("new product");
        updatedProduct = {id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = parseInt(cart.totalPrice) + parseInt(productPrice);

      // update this data in file 
      fs.writeFile(path.join(__dirname,'..','data','cart.json'), JSON.stringify(cart), (err) => {
        if (err)
          console.log(err);
      });

    });
  }

  async deleteProduct(id) {
    const cart = await Cart.fetchProducts();
    const findProduct = await Product.findProductByID(id);
    let currentPrice = cart.totalPrice;

    const updatedProducts = cart.products.filter(product => {
      if (product.id === id)
        currentPrice = currentPrice - (+product.qty * +findProduct.price);
      else 
        return {...product};
    });
    
    const newCartItems = {products: [...updatedProducts], totalPrice: currentPrice};

    const fileName = path.join(__dirname,'..','data','cart.json');
    fs.writeFile(fileName, JSON.stringify(newCartItems), (err) => {
      if (err)
        console.log(err);
    })
  }
}

module.exports = Cart;

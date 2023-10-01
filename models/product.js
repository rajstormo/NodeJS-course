const fs = require("fs");
const path = require("path");

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // update
    const fileName = path.join(__dirname, '..', 'data', 'products.json');
    let products = [];

    if (this.id) {
      fs.readFile(fileName, (err, data) => {
        
        if (!err) {
          products = JSON.parse(data);
          //check existing product index
          const existingProductIndex = products.findIndex(curr_product => curr_product.id === this.id);
          products[existingProductIndex] = this;

          // update the products data
          fs.writeFile(fileName, JSON.stringify(products), (err) => {
            if (err)
              console.log(err);
          })
        }
      })
    }
    else {
      this.id = Math.random().toString();
      fs.readFile(fileName, (err, data) => {
        if (!err) {
          products = JSON.parse(data);
        }
        products.push(this);
        fs.writeFile(fileName, JSON.stringify(products), (err) => {
          console.log("error: " + err);
        })
      })
    }
  }

  async delete(id) {
    const products = await Product.fetchAll();
    const updatedProducts = products.filter(product => product.id !== id);
    const fileName = path.join(__dirname, '..', 'data', 'products.json');
    fs.writeFile(fileName, JSON.stringify(updatedProducts), (err) => {
      console.log(err);
    })
  }


  static fetchAll() {
    const fileName = path.join(__dirname, '..', 'data', 'products.json');
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (!err) {
          let products = JSON.parse(data.toString());
          resolve(products);
        }
        else
          reject(err);
      })
    });
  }

  static async findProductByID(id) {
    const products = await this.fetchAll();
    const product = products.find(curr_prod => curr_prod.id === id);
    return product;
  }
}

module.exports = Product;
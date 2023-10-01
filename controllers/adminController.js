const Product = require("../models/product");

const addNewProduct = (req, res) => {
  res.render('./admin/add-product', { pageTitle: "Add Product" });
}

const handleNewProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body;

  const product = new Product(null, title, imageUrl, description, price);

  product.save();
  res.redirect('/');
}

const getEditProduct = async (req, res) => {
  try {
    const editMode = req.query.edit;
    const { productID } = req.params;
    const product = await Product.findProductByID(productID);

    res.render("./admin/edit-product", {
      pageTitle: "Edit Product",
      product: product,
      editing: editMode,
      path: '/admin/edit-product'
    });
  }
  catch (err) {
    console.log(err);
  }
}

const postEditProduct = async (req, res) => {
  //id receive -> req.body.id 
  // find the index of the product with help of it's id
  // update the details of the product at that index
  
  const id = req.params.productID;
  const { title, description, price, imageUrl } = req.body;

  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

const deleteProduct = async (req, res) => {
  const id = req.params.productID;
  const product = new Product();
  product.delete(id);
  res.redirect('/');
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    res.render("./admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: '/admin/products'
    });
  }
  catch (err) {
    console.log(err);
  }
}



module.exports = { addNewProduct, handleNewProduct, getEditProduct, postEditProduct, deleteProduct, getProducts };
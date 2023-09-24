
const products = [];

const addNewProduct = (req, res) => {
  res.render('add-product', { pageTitle: "Add Product" });
}

const handleNewProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
}

const getProducts = (req, res) => {
  res.render('shop', { prods: products, pageTitle: 'Shop' });
}

module.exports = { addNewProduct, handleNewProduct, getProducts};
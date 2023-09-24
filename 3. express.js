const express = require('express');
const app = express();
const path = require("path");

const {router: adminRoutes} = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// app.set() -> allows to set values globally on express application
app.set('view engine', 'pug');
app.set('views','views');

// parses form data and makes it available in the req.body 
app.use(express.urlencoded({extended:false}));

// to serve static files
app.use(express.static(path.join(__dirname,'public')));

// the order of the below app.use(routes) doesn't matter since we are not handling the routes defined inside these using app.use() method rather we are using app.get() or app.post() to handle the same

// so the routes defined inside the adminRoutes will only work if they are prefixed with /admin and one more advantage here is that if all the routes inside it needs to be prefixed with /admin, we had to specify it on every route that existed, but just adding it here will do the work for each and every route defined there 

app.use('/admin',adminRoutes); // prefixing these adminRoutes with '/admin'
app.use(shopRoutes);

// if a route entered by user doesn't exist, show 404 error page
app.use((req,res) => {
  res.status(404).render('404',{pageTitle:"Error"});
})


// starting the server
app.listen(3000, () => {
  console.log("listening on port 3000");
})
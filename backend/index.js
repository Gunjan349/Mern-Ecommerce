const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer({dest:'uploads/'})

mongoose.set('strictQuery',false);
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log(err)})


const bodyParser = require('body-parser');

const product = require('./controller/productController');
const user = require('./controller/UserController');
const roles= require('./controller/RolesController');
const middleware= require ('./middleware/authorization');
const payment = require('./controller/paymentController')
const contact = require('./controller/contactController');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads' , express.static('uploads'));

// products
app.post('/add-products',upload.single('image'), product.addProduct);
app.get('/get-products' , product.getProducts);
app.get('/category' , product.category);
app.post('/color' , product.color);
app.post('/size' , product.size)
app.post('/category-color' , product.categoryColor);
app.post('/category-size' , product.categorySize)
app.get('/search' ,product.searchProducts );
app.get('/get-product/:id' , product.getSingleProduct);

// user
app.post('/signup', user.signUp);
app.post('/login', user.login);
app.post('/update-user' , user.updateUser);
app.get('/get-users' , middleware.authorization , user.getAllUsers);
app.get('/get-user/:id' , middleware.authorization , user.getSingleUser);
app.post('/user-cart' , user.userCart);
app.post('/get-cart' , user.getcart);
app.post('/wishlist' , user.addToWishlist);
app.post('/get-wishlist' , user.getWishlist);
app.post('/delete-wishlist' , user.deleteWishlist);
app.put('/password' , user.updatePassword);
app.post('/forgot-password' , user.forgotPassword);
app.post('/reset-password' , user.resetPassword)
app.post('/delete-cart' , user.deleteCart);

// roles
app.post('/add-role', roles.addRole);
app.post('/delete-role', roles.deleteRole);

// contact
app.post('/contact' , contact.contactForm);

// payment
app.post('/orders' , payment.orders);
app.post('/verify' , payment.verify);

app.listen(port,()=>{
    console.log(`backend is running ${port}`);
});


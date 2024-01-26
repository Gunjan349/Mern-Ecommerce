const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

console.log(process.env.CONNECTION_STRING);
mongoose.set('strictQuery',false);
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log(err),"12"})


const bodyParser = require('body-parser');
const product = require('./controller/productController');
const user = require('./controller/UserController');
const roles= require('./controller/RolesController');
const middleware= require ('./middleware/authorization');
const uploadImages = require('./middleware/uploadImages')
const blog = require('./controller/blogController');
const color = require('./controller/colorController');
const enquiry = require('./controller/enqController');
const prodcategory = require('./controller/prodcategoryController');
const blogCat = require('./controller/blogCatController');
const brand = require('./controller/brandController');
const coupon = require('./controller/couponController');
const payment = require('./controller/paymentController');



app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

// products
app.post('/add-products', middleware.authorization , product.addProduct);
app.put('/upload-image' , middleware.authorization , uploadImages.uploadPhoto.array('images' , 10) , uploadImages.productImgResize , product.uploadImages);
app.get('/get-products' , product.getProducts);
app.post('/update-products', middleware.authorization , product.updateProducts);
app.delete('/delete-image/:id' ,middleware.authorization , product.deleteImages);
// id = public id 
app.get('/get-product/:id' , product.getSingleProduct);
app.post('/delete-products', middleware.authorization , product.deleteProducts);
app.put('/rating' , product.rating);


// user
app.post('/signup', user.signUp);
app.post('/login', user.login);
app.post('/update-user' , user.updateUser);
app.put('/save-address' , user.saveAddress);
app.get('/get-users' , middleware.authorization , user.getAllUsers);
app.get('/get-user/:id' , middleware.authorization , user.getSingleUser);
app.post('/delete-user' , user.deleteUser);
app.post('/user-cart' , user.userCart);
app.post('/apply-coupon' , middleware.authorization , user.applyCoupon);
app.post('/create-cash-order' , user.createOrder);
app.get('/get-orders', user.getOrders);
app.put('/update-order-status/:id' ,middleware.authorization, user.updateOrderStatus);
app.post('/get-cart' , user.getcart);
app.delete('/empty-cart' , user.emptycart);
app.put('/wishlist' , user.addToWishlist);
app.get('/get-wishlist' , user.getWishlist);
app.post("/block-user" ,middleware.authorization, user.blockUser );
app.post('/unblock-user' ,middleware.authorization, user.unblockUser);
app.post('/add-role', roles.addRole);
app.post('/delete-role', roles.deleteRole);
app.put('/password' ,middleware.authorization , user.updatePassword)
app.post('/forgot-password-token' , user.forgotPasswordToken);
app.put('/reset-password/:token' , user.resetPassword)


// blog
app.post('/blog', middleware.authorization , blog.createBlog);
app.put('/likes' , middleware.authorization , blog.likedBlog);
app.put('/dislikes', middleware.authorization , blog.dislikedBlog)
app.put('/update-blog/:id' , middleware.authorization , blog.updateBlog);
app.get("/get-blog/:id" , blog.getBlog);
app.get('/get-blogs' , blog.getAllBlogs);
app.delete("/delete-blog/:id" , middleware.authorization , blog.deleteBlog);
app.put('/upload-image/:id' , middleware.authorization , uploadImages.uploadPhoto.array('images' , 10) , uploadImages.blogImgResize , product.uploadImages);

// category
app.post('/category' ,middleware.authorization, prodcategory.createCategory);
app.put('/update-category/:id' ,middleware.authorization, prodcategory.updateCategory);
app.delete('/delete-category/:id' ,middleware.authorization, prodcategory.deleteCategory);
app.get('/get-category/:id' , prodcategory.getACategory);
app.get('/get-categoies' , prodcategory.getAllCategory);


// blog category

app.post('/blog-category' ,middleware.authorization, blogCat.createCategory);
app.put('/update-blog-category/:id' ,middleware.authorization, blogCat.updateCategory);
app.delete('/delete-blog-category/:id' ,middleware.authorization, blogCat.deleteCategory);
app.get('/get-blog-category/:id' , blogCat.getACategory);
app.get('/get-blog-categoies' , blogCat.getAllCategory);

// brand
app.post('/brand' ,middleware.authorization, brand.createbrand);
app.put('/update-brand/:id' ,middleware.authorization, brand.updatebrand);
app.delete('/delete-brand/:id' ,middleware.authorization, brand.deletebrand);
app.get('/get-brand/:id' , brand.getAbrand);
app.get('/get-categoies' , brand.getAllbrand);

// color
app.post('/color' ,middleware.authorization, color.createcolor);
app.put('/update-color/:id' ,middleware.authorization, color.updatecolor);
app.delete('/delete-color/:id' ,middleware.authorization, color.deletecolor);
app.get('/get-color/:id' , color.getAcolor);
app.get('/get-categoies' , color.getAllcolor);

// Enquiry
app.post('/enquiry', enquiry.createEnquiry);
app.put('/update-enquiry/:id' ,middleware.authorization, enquiry.updateEnquiry);
app.delete('/delete-enquiry/:id' ,middleware.authorization, enquiry.deleteEnquiry);
app.get('/get-enquiry/:id' , enquiry.getAEnquiry);
app.get('/get-categoies' , enquiry.getAllEnquiry);

// coupon
app.post('/coupon' ,middleware.authorization, coupon.createCoupon);
app.get('/get-coupons' , middleware.authorization , coupon.getCoupons);
app.put('/update-coupon/:id' ,middleware.authorization , coupon.updateCoupon );
app.delete('/delete-coupon/:id' ,middleware.authorization , coupon.deleteCoupon );

// payment
app.post('/orders' , payment.orders);
app.post('/verify' , payment.verify);

app.listen(port,()=>{
    console.log("backend is running." + port);
});


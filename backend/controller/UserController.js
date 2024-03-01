const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const rolesModel = require("../Models/RolesModel");
const validateMongoDBId = require("./utils/validateMongoDBid");
const nodemailer = require("nodemailer");


// Create user (signup)

module.exports.signUp = async (req, res) => {
  const Name = req.body.Name;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const type = req.body.type || "user";
  const findUser = await userModel.findOne({ email: email });

  const roleData = await rolesModel.findOne({ role : type });
  console.log(roleData);
  const roles = [roleData._id];

  if (!Name) {
    return res.send({ code: 400, message: "Name required" });
  } else if (!password) {
    return res.send({ code: 400, message: "password required" });
  } else if (!email) {
    return res.send({ code: 400, message: "email required" });
  } else if (!phone) {
    return res.send({ code: 400, message: "phone required" });
  } else if (findUser) {
    return res.send("user already exists");
  } else {
    const newUser = new userModel({
      Name,
      password,
      
      type,
      email,
      phone,
      roles,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      res.send({ code: 200, message: "User saved" });
    } else {
      res.send({ code: 500, message: "server error" });
    }
  }
};

// login user

module.exports.login = async (req, res) => {
  
  const password = req.body.password;
  const email = req.body.email;

  if (!password) {
    return res.send({ code: 400, message: "password required" });
  } else if (!email) {
    return res.send({ code: 400, message: "email required" });
  } else {
    const isNameExists = await userModel
      .findOne({ email: email })
      .populate("roles");

    if (isNameExists) {
      if (isNameExists.password === password) {
        
       
        // token
        const token = jwt.sign(
          {
            Name: isNameExists.Name,
            email: isNameExists.email,
            password: isNameExists.password,
            type: isNameExists.type,
            roles: isNameExists.roles,
          },
          "keep silence",
          { expiresIn: "1h" }
        );
        return res.send({
          code: 200,
          message: "Successfully logged in.",
          token: token,
          user: isNameExists,
        });
      } else {
        res.send({ code: 404, message: "password is not correct" });
      }
    } else {
      return res.send({ code: 404, message: "user is not found" });
    }
  }
};



// update user

module.exports.updateUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  validateMongoDBId(_id);
  if (findUser) {
    const updateUser = await userModel.findByIdAndUpdate(
      findUser._id,
      {
        url: req?.body?.url,
        Name: req?.body?.Name,
        email: req?.body?.email,
        phone: req?.body?.phone,
      },
      {
        new: true,
      }
    );
    return res.send({
      code: 200,
      message: "user updated successfully",
      data: updateUser,
    });
  } else {
    return res.send({ code: 400, message: "user not found" });
  }
};


// get all users

module.exports.getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await userModel.find().populate("wishlist");
    return res.send({ code: 200, message: "users found", data: getAllUsers });
  } catch {
    return res.send({ code: 500, message: "server error users not found" });
  }
};

// get single user

module.exports.getSingleUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    const getSingleUser = await userModel
      .findById(findUser._id)
      .populate("wishlist");
    return res.send({ code: 200, message: "user found", data: getSingleUser });
  } else {
    return res.send({ code: 400, message: "user not found" });
  }
};


// update password

module.exports.updatePassword = async (req, res) => {
  const { _id } = req.userModel;
  const { password } = req.body;
  validateMongoDBId(_id);
  const user = await userModel.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    return res.send({
      code: 200,
      message: "password updated",
      data: updatedPassword,
    });
  } else {
    return res.send({ data: user });
  }
};

// forget password 

module.exports.forgotPassword = async (req, res) => {
  const _otp = Math.floor(100000 + Math.random() * 900000);
  
  const user = await userModel.findOne({ email: req.body.email });
  
  if(!user){
    res.send({code : 500 , message : 'user not found'});
  }
  else{
    const updateData = await userModel.findOneAndUpdate({email : req.body.email} , {
      otp : _otp
    } , {
      new : true
    })

    await updateData.save();
  }
  

  let transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : "gunjangarg349@gmail.com",
      pass : "vejr drkb xbvk pfyn"
    }
  }) 

  let info = transporter.sendMail({
    from : "gunjangarg349@gmail.com",
    to : req.body.email,
    subject : "Reset Password",
    text : `Your One-time password is ${_otp}`
  })

  if(info){
    res.send({code : 200, message : 'email sent'});
  }
  else{
    res.send({code : 400, message : 'email not sent'});
  }

 
  
};

// reset password

module.exports.resetPassword = async (req, res) => {
   
  userModel.findOne({otp : req.body.otp}).then(result => {
    console.log(result)
    userModel.updateOne({email : result.email}, {password : req.body.password})
    .then(result => { 
      res.send({code : 200, message: "password updated"})
    })
    .catch(err => {
      res.send({code : 500, message:"server error"})
    })
  })

  .catch(err =>{
    res.send({code : 500, message:"Wrong OTP"})
  })
};

// user cart

module.exports.userCart = async (req, res) => {
  const update = await userModel.updateOne(
    { _id: req.body.userId },
    {
      $addToSet: { cart: req.body.productId },
    }
  );

  if (update) {
    return res.send({ code: 200, message: "product added to cart" });
  } else {
    return res.send({ code: 400, message: "product not added to cart" });
  }
};

// get cart

module.exports.getcart = async (req, res) => {
  const id = req.body.userId;
  try {
    const cart = await userModel.findOne({ _id: id }).populate("cart");
    if (cart) {
      return res.send({ code: 200, message: "cart found", data: cart });
    }
  } catch {
    return res.send({ code: 500, message: "cart not found" });
  }
};

// delete cart

module.exports.deleteCart = async (req, res) => {
  const deleteItem = await userModel.updateOne(
    { _id: req.body.userId },
    { $pull: { cart: req.body.productId } }
  );

  if (deleteItem) {
    return res.send({ code: 200, message: "product removed from cart" });
  } else {
    return res.send({ code: 400, message: "product not removed from cart" });
  }
};


// add to wishlist

module.exports.addToWishlist = async (req, res) => {
  const update = await userModel.updateOne(
    { _id: req.body.userId },
    {
      $addToSet: { wishlist: req.body.productId },
    }
  );

  if (update) {
    return res.send({
      code: 200,
      message: "product added to WISHLIST",
      data: update,
    });
  } else {
    return res.send({ code: 400, message: "product not added to wishlist" });
  }
};

//   get wishlist
module.exports.getWishlist = async (req, res) => {
  const id = req.body.userId;
  try {
    const wishlist = await userModel.findOne({ _id: id }).populate("wishlist");
    if (wishlist) {
      return res.send({ code: 200, message: "wishlist found", data: wishlist });
    }
  } catch {
    return res.send({ code: 500, message: "wishlist not found" });
  }
};

// delete wishlist
module.exports.deleteWishlist = async (req, res) => {
  const deleteItem = await userModel.updateOne(
    { _id: req.body.userId },
    { $pull: { wishlist: req.body.productId } }
  );
  if (deleteItem) {
    res.send({ code: 200, message: "item deleted" });
  } else {
    res.send({ code: 400, message: "item not deleted" });
  }
};

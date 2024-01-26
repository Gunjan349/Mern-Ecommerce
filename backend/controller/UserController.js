const userModel = require("../Models/userModel");
const productModel = require("../Models/productModel");
const cartModel = require("../Models/cartModel");
const couponModel = require("../Models/couponModel");
const orderModel = require("../Models/orderModel");
const jwt = require("jsonwebtoken");
const rolesModel = require("../Models/RolesModel");
const validateMongoDBId = require("./utils/validateMongoDBid");
const { sendEmail } = require("./emailController");
const crypto = require("crypto");
const uniqid = require("uniqid");

// Create user (signup)

module.exports.signUp = async (req, res) => {
  const Name = req.body.Name;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const type = req.body.type || "user";
  const url =
    req.body.url ||
    "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/";
  const findUser = await userModel.findOne({ email: email });

  const roleData = await rolesModel.findOne({ role: type });
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
      url,
      type,
      email,
      phone,
      roles,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      res.send({ code: 200, message: "saved" });
    } else {
      res.send({ code: 500, message: "server error" });
    }
  }
};

// login user

module.exports.login = async (req, res) => {
  const Name = req.body.Name;
  const password = req.body.password;
  const email = req.body.email;

  if (!Name) {
    return res.send({ code: 400, message: "Name required" });
  } else if (!password) {
    return res.send({ code: 400, message: "password required" });
  } else if (!email) {
    return res.send({ code: 400, message: "email required" });
  } else {
    const isNameExists = await userModel
      .findOne({ email: email })
      .populate("roles");

    if (isNameExists) {
      if (await isNameExists.isPasswordMatch(password)) {
        // cookies
        const refreshToken = jwt.sign(
          {
            id: isNameExists._id,
          },
          "keep silence",
          { expiresIn: "3d" }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });

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
          { expiresIn: "10h" }
        );
        return res.send({
          code: 200,
          message: "login success",
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

// logout

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

// save user address

module.exports.saveAddress = async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const updateAddress = await userModel.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    return res.send({
      code: 200,
      message: "address saved successfully",
      data: updateAddress,
    });
  } catch {
    return res.send({ code: 500, message: "server error" });
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

// delete user

module.exports.deleteUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    const deleteUser = await userModel.findByIdAndDelete(findUser._id);
    return res.send({ code: 200, message: "user deleted", data: deleteUser });
  } else {
    return res.send({ code: 400, message: "user not found" });
  }
};

// block user

module.exports.blockUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  validateMongoDBId(_id);
  if (findUser) {
    const blockUser = await userModel.findOneAndUpdate(
      findUser._id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    return res.send({ code: 200, message: "user blocked", data: blockUser });
  } else {
    return res.send({ code: 400, message: "user not found" });
  }
};

// unblock user

module.exports.unblockUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  validateMongoDBId(_id);
  if (findUser) {
    const unblockUser = await userModel.findOneAndUpdate(
      findUser._id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    return res.send({
      code: 200,
      message: "user unblocked",
      data: unblockUser,
    });
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

// forget password token

module.exports.forgotPasswordToken = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.send({ code: 404, message: "user not found for this email" });
  }
  try {
    const token = await user.createpasswordResetToken();
    await user.save();
    const resetURL = `hi , follow this link to reset password . this link is valid for 10 minutes. <a href='http://localhost:3000/user/reset-password/${token}'>click here </a>`;
    const data = {
      to: email,
      subject: "forgot password link",
      text: "hey user",
      htm: resetURL,
    };
    sendEmail(data);
    return res.send({ code: 200, message: "token created", token: token });
  } catch (err) {
    return res.send(err);
  }
};

// reset password

module.exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.send({ code: 400, message: "token expired" });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return res.send({ data: user });
};

// user cart

module.exports.userCart = async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    let products = [];
    const user = await userModel.findById(_id);

    // if user already have a cart then update it
    const alreadyExistCart = await cartModel.findOne({ orderBy: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await productModel
        .findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = getPrice.price;
      products.push(object);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new cartModel({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();

    return res.send({ code: 200, message: "cart updated", data: newCart });
  } catch {
    return res.send({ code: 500, message: "server error cart not updated" });
  }
};

// get cart

module.exports.getcart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await cartModel
      .findOne({ orderBy: _id })
      .populate("products.product");
    if (cart) {
      return res.send({ code: 200, message: "cart found", data: cart });
    }
  } catch {
    return res.send({ code: 500, message: "cart not found" });
  }
};

// empty cart

module.exports.emptycart = async (req, res) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const user = await userModel.findById(_id);
    const cart = await cartModel.findOneAndRemove({ orderBy: user._id });
    if (cart) {
      return res.send({ code: 200, message: "cart removed", data: cart });
    }
  } catch {
    return res.send({ code: 500, message: "cart not removed" });
  }
};

// add to wishlist

module.exports.addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await userModel.findById(_id);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdded) {
      let user = await userModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      return res.send({
        code: 200,
        message: "removed from wishlist",
        data: user,
      });
    } else {
      let user = await userModel.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      return res.send({ code: 200, message: "added to wishlist", data: user });
    }
  } catch {
    return res.send({ code: 400, message: "cannot be added to wishlist" });
  }
};

//   get wishlist
module.exports.getWishlist = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await userModel.findById(_id).populate("wishlist");
    return res.send({
      code: 200,
      message: "wishlist found",
      data: user,
    });
  } catch {
    return res.send({ code: 400, message: "wishlist not found" });
  }
};

// apply coupon
module.exports.applyCoupon = async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  const validCoupon = await couponModel.findOne({ name: coupon });

  if (validCoupon === null) {
    return res.send({ code: 400, message: "coupon not found" });
  }

  const user = await userModel.findOne({ _id });
  let { cartTotal } = await cartModel
    .findOne({ orderBy: user._id })
    .populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await cartModel.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  return res.send({
    code: 200,
    message: "coupon applied",
    data: totalAfterDiscount,
  });
};

// create order (cash on delivery)

module.exports.createOrder = async (req, res) => {
  const { CashOnDelivery, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    if (!CashOnDelivery) {
      return res.send({ code: 400, message: "cash on delivery is required" });
    }
    const user = await userModel.findById(_id);
    const userCart = await cartModel.findOne({ orderBy: user._id });
    let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new orderModel({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "Cash On Delivery",
        amount: finalAmount,
        status: "Cash On Delivery",
        created: Date.now(),
        currency: "USD",
      },
      orderBy: user._id,
      orderStatus: "Cash On Delivery",
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await productModel.bulkWrite(update, {});
    return res.send({ code: 200, message: "order created", data: newOrder });
  } catch {
    return res.send({ code: 500, message: "order not created" });
  }
};

// get orders

module.exports.getOrders = async (req, res) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const user = await userModel.findById(_id).populate("orders");
    if (user) {
      return res.send({
        code: 200,
        message: "orders found",
        data: user.orders,
      });
    }
  } catch {
    return res.send({ code: 500, message: "orders not found" });
  }
};

// update order status
module.exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDBId(id);
  try{
    const updateOrderStatus = await orderModel.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          },
        },
        { new: true }
      );
      return res.send({code : 200 , message : "order status updated" , data : updateOrderStatus});
  }
  catch{
    return res.send({code : 500, message : "order status not updated"});
  }
};

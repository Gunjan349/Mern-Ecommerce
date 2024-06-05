const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
   
    Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    type: String,
    password: { type: String, required: true },
    
    otp: { type: String },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],

    roles: [{ type: String, ref: "roles" }],
    
    passwordChangedAt: Date,
    
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);

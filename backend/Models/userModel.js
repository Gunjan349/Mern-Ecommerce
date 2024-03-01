const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcryptjs.genSaltSync(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("users", userSchema);

const mongoose = require("mongoose");

const cartchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        count: Number,
        colour: String,
        price : Number ,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartchema);

const productModel = require("../Models/productModel");
const slugify = require("slugify");

// create product

module.exports.addProduct = async (req, res) => {
  if (req.body.Name) {
    req.body.url = slugify(req.body.Name);
  }

  const image = req.file.path;
  const Name = req.body.Name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const rating = req.body.rating;
  const colors = JSON.parse(req.body.colors);
  const sizes = JSON.parse(req.body.sizes);

  const newProduct = new productModel({
    image: image,
    description: description,
    price: price,
    Name: Name,
    quantity: quantity,
    category: category,
    rating: rating,
    colors: colors,
    sizes: sizes,
  });

  const isSaved = await newProduct.save();

  if (isSaved) {
    res.send({
      code: 200,
      message: "Product saved successfully",
      data: newProduct,
    });
  } else {
    res.send("Product not saved");
  }
};

// get all products
module.exports.getProducts = async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const queryObj2 = JSON.parse(queryStr);

  let query = productModel.find(queryObj2);

  const data = await query;

  if (data.length > 0) {
    res.send({ code: 200, message: "success", data: data });
  } else if (data.length == 0) {
    res.send({ code: 404, message: "data not found" });
  } else {
    res.send({ code: 500, message: "server error" });
  }
};

// category

module.exports.category = async (req, res) => {
  const catName = req.query.catName;

  const query = await productModel.find({ category: catName });

  if (query) {
    return res.send({ code: 200, message: "Product's category", data: query });
  } else {
    return res.send({ code: 404, message: "Product not found" });
  }
};

// search

module.exports.searchProducts = async (req, res) => {
  const search = req.query.search;
  const query = await productModel.find({
    $or: [
      { Name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ],
  });

  if (query) {
    return res.send({
      code: 200,
      message: "Product has been found",
      data: query,
    });
  } else {
    return res.send({ code: 404, message: "Product not found" });
  }
};

// color

module.exports.color = async (req, res) => {
  const colour = await productModel.find({
    colors: { $elemMatch: { color: req.body.color } },
  });

  if (colour) {
    return res.send({ code: 200, message: "Products found", data: colour });
  } else {
    return res.send({ code: 404, message: "Products not found" });
  }
};

// size

module.exports.size = async (req, res) => {
  const sizes = await productModel.find({
    sizes: { $elemMatch: { value: req.body.size } },
  });

  if (sizes) {
    return res.send({ code: 200, message: "Products found", data: sizes });
  } else {
    return res.send({ code: 404, message: "Products not found" });
  }
};

// category color

module.exports.categoryColor = async (req, res) => {
  const colour = await productModel.find({
    category: req.body.category,
    colors: { $elemMatch: { color: req.body.color } },
  });

  if (colour) {
    return res.send({ code: 200, message: "Products found", data: colour });
  } else {
    return res.send({ code: 404, message: "Products not found" });
  }
};

// category size
module.exports.categorySize = async (req, res) => {
  const sizes = await productModel.find({
    category: req.body.category,
    sizes: { $elemMatch: { value: req.body.size } },
  });

  if (sizes) {
    return res.send({ code: 200, message: "Products found", data: sizes });
  } else {
    return res.send({ code: 404, message: "Products not found" });
  }
};

// update products

module.exports.updateProducts = async (req, res) => {
  const id = req.body.id;

  if (req.permissions.indexOf("Update price") === -1) {
    return res.send({ code: 401, message: "unauthenticated" });
  }

  const newData = {};

  if (req.body.url) {
    newData["url"] = req.body.url;
  }
  if (req.body.Name) {
    newData["Name"] = req.body.Name;
  }
  if (req.body.category) {
    newData["category"] = req.body.category;
  }
  if (req.body.description) {
    newData["description"] = req.body.description;
  }
  if (req.body.seller) {
    newData["seller"] = req.body.seller;
  }
  if (req.body.price) {
    newData["price"] = req.body.price;
  }
  if (req.body.quantity) {
    newData["quantity"] = req.body.quantity;
  }
  if (req.body.sold) {
    newData["sold"] = req.body.sold;
  }
  if (req.body.color) {
    newData["color"] = req.body.color;
  }
  if (req.body.ratings) {
    newData["ratings"] = req.body.ratings;
  }

  let filter = { _id: id };

  let doc = await productModel.findOneAndUpdate(filter, newData, { new: true });
  if (doc) {
    res.send({ code: 200, message: "updated", data: doc });
  } else {
    res.send("not updated");
  }
};

// get single product
module.exports.getSingleProduct = async (req, res) => {
  let data = await productModel.findById(req.params.id).populate("colors");
  if (data) {
    res.send({ code: 200, message: "Product found", data: data });
  }
};

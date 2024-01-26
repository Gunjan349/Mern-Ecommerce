const { query } = require("express");
const userModel = require("../Models/userModel");
const productModel = require("../Models/productModel");
const slugify = require("slugify");
const validateMongoDBId = require("./utils/validateMongoDBid");
const fs = require("fs");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("./utils/cloudinary");

// create product

module.exports.addProduct = async (req, res) => {
  if (req.body.Name) {
    req.body.url = slugify(req.body.Name);
  }

  const newProduct = new productModel(req.body);

  if (req.permissions.indexOf("view home-page") === -1) {
    return res.send({ code: 401, message: "unauthenticated" });
  }

  const isSaved = await newProduct.save();

  if (isSaved) {
    res.send("saved");
  } else {
    res.send("not saved ");
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

  // sorting
  let query1 = productModel.find();

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query1.sort(sortBy);
  } else {
    query = query1.sort("-createdAt");
  }

  //  limiting the fields

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // pagination

  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const productCount = await productModel.countDocuments();
    if (skip >= productCount) {
      return res.send({ code: 404, message: "page does not exists" });
    }
  }

  const data = await query;

  if (data.length > 0) {
    res.send({ code: 200, message: "success", data: data });
  } else if (data.length == 0) {
    res.send({ code: 404, message: "data not found" });
  } else {
    res.send({ code: 500, message: "server error" });
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
  console.log(req.params, "137");
  let data = await productModel.findById(req.params.id);
  if (data) {
    res.send({ code: 200, message: "by id success", data: data });
  }
};

// delete products

module.exports.deleteProducts = async (req, res) => {
  const ids = req.body;

  if (req.permissions.indexOf("delete products") === -1) {
    return res.send({ code: 401, message: "unauthenticated" });
  }

  const response = await productModel.deleteMany({ _id: { $in: ids } });

  if (response) {
    res.send({ code: 200, message: "deleted", data: response });
  } else {
    res.send({ code: 500, message: "not deleted" });
  }
};

// total ratings
module.exports.rating = async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  try {
    const product = await productModel.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRatings = await productModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateproduct = await productModel.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              postedby: _id,
              comment: comment,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getAllratings = await productModel.findById(productId);
    let totalrating = getAllratings.ratings.length;
    let sumofratings = getAllratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(sumofratings / totalrating);
    let finalproduct = await productModel.findByIdAndUpdate(
      productId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      }
    );
    return res.send({
      code: 200,
      message: "total ratings",
      data: finalproduct,
    });
  } catch {
    return res.send({ code: 400, message: "not rated successfully" });
  }
};

// upload images
module.exports.uploadImages = async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    return res.send({ message: "images", data: images });
  } catch {
    return res.send({
      code: 400,
      message: "images not uploaded",
    });
  }
};

// delete images
module.exports.deleteImages = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    return res.send({ message: "images deleted" });
  } catch {
    return res.send({
      code: 400,
      message: "images not uploaded",
    });
  }
};

const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// storage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  fileName: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

// filter
const multerFilter = (req, file, cb) => {
  if (file.minetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

// uploadPhoto
module.exports.uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

// product resizing
module.exports.productImgResize = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.fileName}`);
        fs.unlinkSync(`public/images/products/${file.fileName}`);
    })
  );
  next();
};

// blogs images resizing
module.exports.blogImgResize = async (req, res, next) => {
    if (!req.files) {
      return next();
    }
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/blogs/${file.fileName}`);
          fs.unlinkSync(`public/images/products/${file.fileName}`);
      })
    );
    next();
  };

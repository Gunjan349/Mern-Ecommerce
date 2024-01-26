const blogModel = require('../Models/blogModel');
const userModel = require('../Models/userModel');
const validateMongoDBId = require('./utils/validateMongoDBid');
const fs = require('fs');
const cloudinaryUploadImg = require('./utils/cloudinary');

// create blog
module.exports.createBlog = async (req,res) => {
   try {
    const newBlog = await blogModel.create(req.body);
    return res.send ({code : 200 , message : "blog created" , data : newBlog})
   }
   catch{
    return res.send({code : 400 , message : "blog not created"})
   }
}

// update blog
module.exports.updateBlog = async (req,res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
     const newBlog = await blogModel.findByIdAndUpdate(id , req.body , {new : true});
     return res.send ({code : 200 , message : "blog created" , data : newBlog})
    }
    catch{
     return res.send({code : 400 , message : "blog not created"})
    }
 };

//  get blog
 module.exports.getBlog = async (req,res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
     const getBlog = await blogModel.findById(id).populate('likes').populate('disLikes');
     const updateViews = await blogModel.findByIdAndUpdate(id , {
        $inc : {numViews : 1}
     } ,{
        new : true
     });

     return res.send ({code : 200 , message : "blog found" , data : getBlog , views: updateViews})
    }
    catch{
     return res.send({code : 400 , message : "blog not found"})
    }
 };

//  get all blogs

module.exports.getAllBlogs = async (req,res) => {
    try {
     const getBlogs = await blogModel.find();
     return res.send ({code : 200 , message : "blogs found" , data : getBlogs})
    }
    catch{
     return res.send({code : 400 , message : "blogs not found"})
    }
 };

//  delete blogs

module.exports.deleteBlog = async (req,res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
     const deletedBlog = await blogModel.findByIdAndDelete(id);
     return res.send ({code : 200 , message : "blog deleted" , data : deletedBlog})
    }
    catch{
     return res.send({code : 400 , message : "blog not deleted"})
    }
 };

//  liked blog

module.exports.likedBlog = async (req,res) =>{
    const { blogId } = req.body;
    validateMongoDBId(blogId);

    // finding blog to be liked by user
    const blog = await blogModel.findById(blogId);

    // finding login user
    const loginUserId = req?.userModel?._id;

    // if user likes blog
    const isLiked = blog?.isLiked;

    // find if user disliked the blog
    const alreadyDisliked = blog?.disLikes?.find((userId => userId?.toString()=== loginUserId?.toString()));

    if(alreadyDisliked){
        const blog = await blogModel.findByIdAndUpdate(blogId ,{
            $pull : {disLikes : loginUserId} ,
            isDisLiked : false
        } , { new : true});
        return res.send({data : blog})
    }
    if(isLiked) {
        const blog = await blogModel.findByIdAndUpdate(blogId ,{
            $pull : {likes : loginUserId} ,
            isLiked : false
        } , { new : true});
        return res.send({data : blog})
    }
    else{
        const blog = await blogModel.findByIdAndUpdate(blogId ,{
            $push : {likes : loginUserId} ,
            isLiked : true
        } , { new : true});
        return res.send({data : blog})
    }
};


// dislike blog
module.exports.dislikedBlog = async (req,res) =>{
    const { blogId } = req.body;
    validateMongoDBId(blogId);

    // finding blog to be liked by user
    const blog = await blogModel.findById(blogId);

    // finding login user
    const loginUserId = req?.userModel?._id;

    // if user likes blog
    const isdisLiked = blog?.isDisLiked;

    // find if user disliked the blog
    const alreadyLiked = blog?.likes?.find((userId => userId?.toString()=== loginUserId?.toString()));

    if(alreadyLiked){
        const blog = await blogModel.findByIdAndUpdate(blogId ,{
            $pull : {likes : loginUserId} ,
            isLiked : false
        } , { new : true});
        return res.send({data : blog})
    }
    if(isdisLiked) {
        const blog = await blogModel.findByIdAndUpdate(blogId ,{
            $pull : {disLikes : loginUserId} ,
            isDisLiked : false
        } , { new : true});
        return res.send({data : blog})
    }
    else{
        const blog = await blogModel.findByIdAndUpdate(blogId ,{
            $push : {disLikes : loginUserId} ,
            isDisLiked : true
        } , { new : true});
        return res.send({data : blog})
    }
};

// upload images

module.exports.uploadImages = async (req,res) =>{
    const {id} = req.params;
    validateMongoDBId(id);
    try{
      const uploader = (path) => cloudinaryUploadImg(path , "images");
      const urls = [];
      const files = req.files;
      for(const file of files){
        const {path} = file;
        const newpath = await uploader(path);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const findBlog = await blogModel.findByIdAndUpdate(id,{
        images : urls.map((file) => {
          return file;
        })
      },{
        new : true
      })
      return res.send({
        code : 200 , message : "images uploaded" , data : findBlog
      })
  
    }
    catch{
      return res.send({
        code : 400 , message : "images not uploaded"});
  
    }
  };
  


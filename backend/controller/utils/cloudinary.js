const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME ,
    api_key : process.env.API_KEY ,
    secret_key : process.env.SECRET_KEY
});

module.exports.cloudinaryUploadImg = async(fileToUploads) =>{
    return new Promise ((resolve) =>{
        cloudinary.Uploader.upload(fileToUploads , (result) =>{
            resolve({
                url : result.secure_url,
                asset_id : result.asset_id, 
                public_id : result.public_id
            } , {
                resource_type : 'auto'
            });
        });
    });
};

// delete images
module.exports.cloudinaryDeleteImgImg = async(fileToDelete) =>{
    return new Promise ((resolve) =>{
        cloudinary.Uploader.destroy(fileToDelete , (result) =>{
            resolve({
                url : result.secure_url,
                asset_id : result.asset_id, 
                public_id : result.public_id
            } , {
                resource_type : 'auto'
            });
        });
    });
};


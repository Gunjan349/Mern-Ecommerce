const coupon = require('../Models/couponModel');
const validateMongoDBId = require('./utils/validateMongoDBid');


module.exports.createCoupon = async (req,res) => {
    try{
        const newCoupon = await coupon.create(req.body);
        return res.send({code : 200 , message : "coupon created" , data: newCoupon});
    }
    catch{
       return res.send({code : 400 , message : 'coupon not created'});
    }
};

// get all coupons

module.exports.getCoupons = async (req,res) => {
    try{
        const coupons = await coupon.find();
        return res.send({code : 200 , message : "get all coupons" , data: coupons});
    }
    catch{
       return res.send({code : 400 , message : 'dos not all coupon'});
    }
};

// update coupon

module.exports.updateCoupon = async (req,res) => {
    const {id} = req.params;
    validateMongoDBId(id)

    try{
        const updateCoupon = await coupon.findByIdAndUpdate(id , req.body , {
            new : true
        })
        return res.send({code : 200 , message : 'coupon updated' , data : updateCoupon})
    }
    catch{
        return res.send({code : 400 , message : 'coupon not updated'})
    }
};

// delete coupon
module.exports.deleteCoupon = async (req,res) => {
    const {id} = req.params;
    validateMongoDBId(id)

    try{
        const deleteCoupon = await coupon.findByIdAndDelete(id)
        return res.send({code : 200 , message : 'coupon deleted' , data : deleteCoupon})
    }
    catch{
        return res.send({code : 400 , message : 'coupon not deleted'})
    }
};



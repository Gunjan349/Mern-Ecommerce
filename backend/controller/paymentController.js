const Razorpay = require('razorpay');
const crypto = require('crypto')
const KEY_ID = "rzp_test_Cl0J6zcpr4UZmH"
const KEY_SECRET = "c1H8JVmvDUi2l6y1N1TqHfss"

module.exports.orders =  (req,res) =>{

    let instance = new Razorpay({key_id : KEY_ID ,  key_secret : KEY_SECRET})

    var options = {
        amount : req.body.amount * 100 ,
        currency : "INR"
    };

    instance.orders.create(options , (err , order) =>{

        if(err){
            return res.send({code : 500 , message : 'server error'})
        }
        return res.send({code : 200 , message : 'order created' , data : order})
    });
}


module.exports.verify = async (req,res) =>{

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id

    var expectedSignature = crypto.createHmac('sha256' , KEY_SECRET)
       .update(body.toString())
       .digest('hex');
    
    if(expectedSignature === req.body.response.razorpay_signature){
        res.send({code : 200 , message : 'sign valid'})
    }
    else{
        res.send({code : 500 , message : 'sign invalid'})
    }
}
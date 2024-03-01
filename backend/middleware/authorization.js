const jwt = require('jsonwebtoken')

module.exports.authorization = async (req ,res ,next) => {
  

    try{
        if(!req.headers.authorization){
            return res.send({code : 40300 , message : 'unauthorized user'})
        }
        
    
        const decodeduser = await jwt.verify(req.headers.authorization , 'keep silence')
        c
        
        if(Date.now()/1000 >= decodeduser.exp){
            return res.send({code : 4030 , message : 'token expired!!'})
        }

        req['user'] = decodeduser;
        req['permissions']  = decodeduser.roles[0].permissions
    
        next()
    
    }
    catch(err){
        return res.send({code : 403 , message : 'token expired!!'})
    }

    }   
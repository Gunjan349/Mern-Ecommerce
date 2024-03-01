const rolesModel  = require('../Models/RolesModel')

module.exports.addRole = async (req,res)=>{

    const role = req.body.role;
    const permissions = req.body.permissions;

    const newrole = new rolesModel({role , permissions})
    const isSaved = await newrole.save()

    if(isSaved){
    return res.send({code : 200 , message : 'role added'})
    }
    else{
        return res.send({code : 500 , message : 'server error'})
    }
}

module.exports.deleteRole = async (req,res) =>{
    return res.send({code : 200 , message : 'delete role'})
}
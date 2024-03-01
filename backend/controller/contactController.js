const Contact = require('../Models/contactModel');

module.exports.contactForm = async (req , res) => {
    try{
        const newContact = await Contact.create(req.body);
        return res.send({code : 200, message : "contact created", data: newContact});
    }
    catch{
        return res.send({code : 400, message : "contact not created" });
    }
}
const nodeMailer = require('nodemailer');

module.exports.sendEmail = async (data,req,res) =>{
   let transporter = nodeMailer.createTransport({
    host : 'smtp.google.com' ,
    port : 587 ,
    secure : false,
    auth : {
        user : process.env.MAIL_ID,
        pass : process.env.MP
    },
});

const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <abc@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });
  if(info){
    res.send('success')
  }

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL : %s" , nodeMailer.getTestMessageUrl(info));
}
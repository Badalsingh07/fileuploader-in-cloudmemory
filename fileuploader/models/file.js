const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
     // post middleware
     fileSchema.post("save",async function(doc){
        try{
              console.log("doc",doc);
              //transporter create krna hai
              let transporter=nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,
                },
              });
              //send mail
              let info = await transporter.sendMail({
                from:'badalsingh',
                to:doc.email,
                subject:"new file uploaded",
                html:`<h2>ho gya bhai upload cloudinary mai</h2>`,

              });
              console.log("info",info);
        }
        catch(error){
            console.error(error);
        }
     })




const File = mongoose.model("File",fileSchema);
module.exports=File;

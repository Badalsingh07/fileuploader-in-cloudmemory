//create app

const express=require("express");
const app = express();

//port find krna
require("dotenv").config();
const PORT = process.env.PORT||3000;

//middleware add krna hai
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
));

//db se connect 
const db= require("./config/database");
db.connect();

//cloudinary connect krna hai
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api mount krna hai
const upload = require("./routes/fileupload");
app.use('/api/v1/upload',upload);

//activate server
app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
    
})
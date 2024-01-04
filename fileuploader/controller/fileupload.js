const File=require("../models/file");
const { options } = require("../routes/fileupload");
const cloudinary=require("cloudinary").v2;
//localfile uload handler function

exports.localFileUpload= async(req,res)=>{
    try{
          //fetch file
          const file=req.files.file;
          console.log("file aagya",file);
          //path add 
          let path = __dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
          console.log("path",path);
          //path of move function
          file.mv(path,(err)=>{
            console.log(err) ;
             
        });
        res.json({
            success:true,
            message:"local file uploaded succesfully "
        });
    }
    catch(error){
        console.log("not able to upload the file on the suerver");
        console.log(error);

    }
}
//image handler

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const option={folder};
    console.log("temprarypath",file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath,option);
}
exports.imageUpload = async (req,res)=>{
   try{
        //data fetch
        const { name, tags, email}= req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedType=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype",fileType);
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            })
        }
        //file format supported
        console.log("image uploading");
        const responce=await uploadFileToCloudinary(file,"badal");
        console.log(responce);

        //db me entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url
        });
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message:"image uploaded succesfully",
        })

   }
   catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:"something went wrong ",
    })

   }
}
//vidio upload handler
function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const option={folder};
    console.log("temprarypath",file.tempFilePath);
    option.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,option);
}
exports.vidioUpload = async (req,res)=>{
   try{
        //data fetch
        const { name, tags, email}= req.body;
        console.log(name,tags,email);
        const file = req.files.vidioFile;
        console.log(file);

        //validation
        const supportedType=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype",fileType);
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            })
        }
        //file format supported
        console.log("vidio uploading");
        const responce=await uploadFileToCloudinary(file,"badal");
        console.log(responce);

        //db  me entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url
        });
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message:"image uploaded succesfully",
        })

   }
   catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:"something went wrong ",
    })

   }
}


//reduceimage handler

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder, quality){
    const option={folder};
    console.log("temprarypath",file.tempFilePath);
    if(quality){
        option.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,option);
}
exports.reduceImageUpload = async (req,res)=>{
   try{
        //data fetch
        const { name, tags, email}= req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedType=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype",fileType);
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            })
        }
        //file format supported
        console.log("image uploading");
        const responce=await uploadFileToCloudinary(file,"badal",30);
        console.log(responce);

        //db me entry
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url
        });
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message:"image uploaded succesfully",
        })

   }
   catch(error){
    console.error(error);
    res.status(400).json({ 
        success:false,
        message:"something went wrong ",
    }) 

   }
}
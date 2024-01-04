const express=require("express");
const router=express.Router();

const{localFileUpload,imageUpload,vidioUpload,reduceImageUpload}=require("../controller/fileupload");
//api route
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/vidioUpload",vidioUpload);
router.post("/reduceImageUpload",reduceImageUpload);
module.exports=router;
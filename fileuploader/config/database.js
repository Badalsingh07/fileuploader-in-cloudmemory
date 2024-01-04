const mongoose =require("mongoose");

require("dotenv").config();
exports.connect = () => {
mongoose.connect(process.env.MONGODB_URL, {
useNewUrlParser: true,
useUnifiedTopology:true,

})
.then(console.log("Db connection sucessfull"))
.catch((error) => {
    console.log("db connection issue");
    console.log(error);
    process.exit(1);
});
};
const mongoose = require("mongoose");


const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.mongoDB_URI)
        console.log("mongoDB connect 👌👌👌😉")
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
        
    }
}
module.exports=connectDB

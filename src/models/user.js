const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    phone:{
        type:Number,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    
},
{timestamps:true}

);
module.exports = mongoose.model("User",UserSchema);
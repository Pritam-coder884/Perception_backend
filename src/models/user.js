const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        min:2,
        max:50
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
    yearOfPassout:{
        type:Number,
        required:true,
    },
    isZairzaMember:{
        type:Boolean,
        required:true,
    },
    
},
{timestamps:true}

);
module.exports = mongoose.model("User",UserSchema);
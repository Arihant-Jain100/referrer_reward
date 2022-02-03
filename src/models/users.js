const validator = require("validator");
const mongoose = require("mongoose");
const req = require("express/lib/request");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1
    },
    email:{
        type:String,
        required:true,
        unique:[true,"This email already exists !"],
        validate(value){
            if(! validator.isEmail(value)){
                throw new Error("invalid email entered");
            }
        }

    },
    referredUser:{
        name:{
            type:String,
            minlength:1
        },
        email:{
            type:String,
            
            validate(value){
                if(! validator.isEmail(value)){
                    throw new Error("invalid email entered");
                }
            }
    
        }

    },
    isPaymentMade:{
        type: Boolean,
        required:true
    
    },
    totalEarnings: {
        type:Number,
        required:true
        
    }

});


const User = new mongoose.model("User", userSchema);

module.exports = User;
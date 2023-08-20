const mongoose = require("mongoose");
const { productSchema } = require("./product");

const userSchema = new mongoose.Schema({
    name : {
        require : true,
        type : String,
        trim : true,
    }
    ,
    email : {
        require : true,
        type : String,
        trim : true,
        validate : {
            validator : function(v){
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ;
                v.match(re);
                message :  "Invalid Email";
            }
        }
    },
    password : {
        require : true,
        type : String,
    },
    address : {
        type : String,
        default : "",
    },
    type :{
        type : String,
        default : "user",
    },
    cart : [
        {
        product : productSchema,
        quantity: {
            type : Number,
            required : true,
        },},
    ],
    //cart
});
const User  = mongoose.model("User",userSchema);
module.exports = User;
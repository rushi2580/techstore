import { name } from "ejs";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    }]
});


 const usermodel = mongoose.model("user", userSchema);

export default usermodel;
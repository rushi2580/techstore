import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    email:String,
    password:String

})

const ownermodel= mongoose.model('owner',ownerSchema)

export default ownermodel;
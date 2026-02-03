
import mongoose from "mongoose";


const productSchema =new mongoose.Schema({

    name:String,
    image:Buffer,
    price:Number,
    discount:Number,
    type:String,
    tag:String
})


const productmodel = mongoose.model('product',productSchema)

export default productmodel;
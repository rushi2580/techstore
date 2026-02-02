import mongoose from "mongoose";
import debug from "debug";
const dbgr = debug("development:mongoose");


import config from 'config';




mongoose
.connect(`${config.get("MONGO_URL")}/techstore`, )
.then(function(){
   dbgr('connected');
   
    
})
.catch(function(err){
   dbgr(err);
})

export const db = mongoose.connection;
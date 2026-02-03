import express from 'express';
const router = express.Router();
import productmodel from '../models/product.js';

import upload from '../config/config-multer.js';



router.post('/create', upload.single('image'), async (req, res) => {
 

  try{
        
    const{  name , discount, price, type,tag } = req.body;
        const prod =  await productmodel.create({
            name,
            image:req.file.buffer,
            price,
            discount,
            tag,
            type
        })
      
        
       res.redirect('/owner/product')
    }
    catch(err){
        res.status(500).send(err);
    }

});

export default router;
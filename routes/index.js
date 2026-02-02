import express from "express";
import productmodel from "../models/product.js";
import usermodel from "../models/user.js";



const router = express.Router()



router.get('/', async (req, res) => {

    let products = await productmodel.find()
    res.render("index.ejs", { products })

});
router.get('/api/product', async (req, res) => {
    const products = await productmodel.find({});

    res.json(products.map(p => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        discount: p.discount,
        type: p.type,
        image: p.image.toString("base64")
    })));
});



router.get("/api/products", async (req, res) => {
    let min = Number(req.query.min) || 0;
    let max = Number(req.query.max) || 2000;

    try {
        let products = await productmodel.find({
            price: { $gte: min, $lte: max }
        });


        products = products.map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            discount: p.discount,
            type: p.type,
            image: p.image.toString("base64")
        }));

        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


router.get('/api/search', async(req, res) => {
        let input = req.query.input;
     
let product = await productmodel.find({ $or: [{ name: { $regex: input, $options: 'i' } }, { type: { $regex: input, $options: 'i' } }] })



        product = product.map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            discount: p.discount,
            type: p.type,
            image: p.image.toString("base64")
        }));
          res.send(product);
         
   
})

router.get('/api/category', async(req, res) => {
    try {
    let categories = req.query.categories;
    const result = categories.split(',').map(item => ({ type: item }));
   
       console.log(result);
      let products = await productmodel.find({ $or: result });
      if(products.length===0){
        return res.status(404).json({ message: "No products found for the selected categories" });
      }
       products = products.map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            discount: p.discount,
            type: p.type,
            image: p.image.toString("base64")
        }));
          res.send(products);
    }
     catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

router.get('/cart', async(req, res) => {
    try {
        if (!req.cookies.token || !req.session.user) {
            req.flash('error', 'You must be logged in to view the cart');
            return res.redirect('/');
        }
        else{
        let qtn= 1;
        let email = req.session.user.email
        
        let user = await usermodel.findOne({email})
        await user.populate('cart')
        
        res.render('cart.ejs',{cart:user.cart,qtn})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

router.get('/cart/:id', async (req, res) => {

    let email = req.session.user.email
    let user = await usermodel.findOne({ email })

   

    user.cart.push(req.params.id)
    req.flash('success', 'Product added to cart')
   await user.save()
   
    res.redirect('/')
})

export default router;
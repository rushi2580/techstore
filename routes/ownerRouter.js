import express from 'express';


const router = express.Router();


if (process.env.NODE_ENV === "development") {

    router.post('/create', (req, res) => {
       res.send('Create product - development mode');
    })
}


router.get('/product', (req, res) => {
    res.render('product.ejs');
})


export default router;
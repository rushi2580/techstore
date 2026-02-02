import express from "express";
import flash from "connect-flash";
import usersRouter from "./routes/usersRouter.js";
import session from "express-session";
import indexRouter from "./routes/index.js";
import dotenv from "dotenv";
import ownerRouter from "./routes/ownerRouter.js";
import productRouter from "./routes/productRouter.js";
import {db} from './config/mongoose-connection.js'
import productmodel from "./models/product.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

dotenv.config();







const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  rolling: true, // refresh session on every request
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/your-db',
    ttl: 24 * 60 * 60 // 1 day in seconds
  })
}));



app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  
  next();
});





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/owner', ownerRouter);
app.use('/product', productRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

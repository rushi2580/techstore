import bcrypt from "bcrypt";
import User from "../models/user.js";
import generatetoken from "../utils/generatetoken.js";


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/");
    }


    let user = await User.findOne({ email });
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/");
    }
     

    let hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      email,
      password: hashedPassword
    });
    let token = generatetoken(user)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

     
    req.flash("success", "Account created successfully");
    req.session.user={
       _id: user.id,
       email: user.email
    }
    req.session.save(()=> {
   return res.redirect("/");
    })

  } catch (error) {
    console.log("REGISTER ERROR ", error);
    req.flash("error", error.message || "Registration failed");
    return res.redirect("/");
  }
};
export const logoutUser = (req, res) => {
  res.cookie('token', '');
  res.redirect('/');
}

export const loginuser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Email or password is invalid");
      return res.redirect("/");
    }

    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      req.flash("error", "Email or password is invalid");
      return res.redirect("/");
    }

    let token = generatetoken(user);
    res.cookie("token", token, { httpOnly: true });

    req.flash("success", "Login successful");
  req.session.user={
       _id: user.id,
       email: user.email
    }

    req.session.save(()=> {
   return res.redirect("/");
    })
  } catch (err) {
    console.log(err);
    req.flash("error", "Login failed");
    return res.redirect("/");
  }
};

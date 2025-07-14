const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    if (!userName || !email || !password || !role) {
      return res.status(400).json({ message: "Please Provide all the fields" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Please to provide a password of at least 8 characters"});
    }
     if (userName.length <5) {
         return res.status(400).json({message : "userName must be at least 5 characters long."});
     }

      const roleValidation = ["admin", "customer"];
      if(!roleValidation.includes(role)){
        return res.status(400).json({message : "Role must be either admin or customer"});
      }
       const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // const existingUsername = await userModel.findOne({ userName });
    // if (existingUserName) {
    //   return res.status(400).json({ message: "Username already taken." });
    // }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        email,
        userName,
        password : passwordHash,
        role 
    });
    await newUser.save();
     res.status(201).json({message : "user Register is  Successfully."});
      
  } catch (error) {
    res.status(500).json({message : "Something went wrong.", error : error.message});
  }
};


 exports.login = async(req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }
      const loginUser = await userModel.findOne({ email });
      // console.log('loginuser', loginUser);

       if(!loginUser) {
         return res.status(400).json({message : "User not found"});
       }
    const  isPassword  = await bcrypt.compare(password, loginUser.password);
    // console.log('isPassword',isPassword);

     if(!isPassword) {
      return res.status(500).json({message : "Invalid password."});
     }
      const token = jwt.sign({id: loginUser._id, email: loginUser.email, role:loginUser.role}, process.env.JWT_SECRET,{
        expiresIn : "7d",
      });
      //  console.log("token", token);
       return res.status(201).json({message : "Login is Successfully", token, role: loginUser.role });
  }
  catch(error) {
    res.status(500).json({message : "Something went wrong.", error : error.message});
  }
 };

  exports.logout = async(req, res) => {
    try {
      res.status(200).json({message : "Logout successfully"});
    }
    catch (error) {
       res.status(500).json({message : "Something went wrong.", error : error.message});
    }
  };
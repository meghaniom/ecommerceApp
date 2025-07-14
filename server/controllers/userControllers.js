const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, userName, password, role } = req.body;
    if (!email || !password || !userName || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    if (userName.length < 3) {
      return res
        .status(400)
        .json({ message: "userName must be at least 3 characters long." });
    }
    const validRoles = ["customer","admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({message : "Invalid role. Must be'User ' or 'admin"})
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      userName,
      password: hashedPassword,
      role,
    });
     console.log('newUser', newUser);
    await newUser.save();
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
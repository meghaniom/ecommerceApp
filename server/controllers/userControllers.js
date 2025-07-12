const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide all valid fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    if (username.length < 5) {
      return res.status(400).json({ message: "Username must be at least 5 characters" });
    }

    const validRoles = ["admin", "customer"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: passwordHash,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
 exports.login = async(req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }
      const loginUser = await userModel.findOne({ email });
    

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
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
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
     if (username.length <5) {
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

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        email,
        username,
        password : passwordHash,
        role 
    });
    await newUser.save();
     res.status(201).json({message : "user Register is  Successfully."});
      
  } catch (error) {
    res.status(500).json({message : "Something went wrong.", error : error.message});
  }
};

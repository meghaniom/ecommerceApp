const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
   email : {
    type : String,
    required : true,
    unique : true,
   },
   password : {
    type : String,
    required : true
   },
   role : {
    type :String,
    enum: ['customer','admin'],
    default : 'customer'
  }
});

  module.exports = mongoose.model("User", userModel);
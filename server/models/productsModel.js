const mongoose = require('mongoose');


const   producteModel = new mongoose.Schema({
    productTitle : {
        type : String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
    price : {
        type : Number,
        required : true,    
    },
    category : {
        type: String,
        required : true,
    },
    stock : {
        type  : Number,
        default : 0,
    },
    image :{
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    updatedAt  : {
        type : Date,
        default : Date.now,
    },
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = mongoose.model('Product',producteModel);
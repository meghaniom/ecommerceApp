const  mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema ({
    userId : { 
type : mongoose.Schema.Types.ObjectId,
ref : "User",
required : true
    },
    watchListItems : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true,
            },
            watchList : {
                type : Boolean,
                default : false,
            }
        }
    ]
});

 module.exports = mongoose.model("WatchList", watchListSchema);
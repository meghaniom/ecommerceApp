
const dbConnect = require('../config/dbConnect');
const User = require('../models/userModel');

(async ()=> {
    try {
        await  dbConnect();
        await User.collection.dropIndex('username_1');
        console.log('Dropped index username_1')
    }
    catch(err) {
        console.log('No such index or error:',err.message);
    }
    finally {
          process.exit();
    }
})
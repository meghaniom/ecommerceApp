const express =  require('express');
const router =express.Router();

const  authMiddleware = require('../middleware/authMiddlwere');
const cartController = require('../controllers/cartControllers');
// const cartController = require('../controllers/cartControllers');


 router.post('/addCart',authMiddleware, cartController.addToCart);
 router.delete('/removeCart', authMiddleware, cartController.removeCart);
 router.get('/getCart',authMiddleware, cartController.getCart);

  module.exports = router;
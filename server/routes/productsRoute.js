const express = require('express');
const router = express.Router();

const productController = require('../controllers/productControllers');
const upload = require('../middleware/upload');


 router.post('/productAdd',upload.single('image'),productController.productAdd);


  module.exports = router;
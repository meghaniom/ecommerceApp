const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddlwere');
const isAdmin = require('../middleware/isAdmin');

const productController = require('../controllers/productControllers');
const upload = require('../middleware/upload');


 router.post('/admin/productAdd', authMiddleware,isAdmin, upload.single('image'),productController.productAdd);
 router.get('/getProduct', authMiddleware , productController.productGet);
 router.delete('/admin/deleteProduct/:id', authMiddleware , isAdmin, productController.deleteProduct);
 router.patch('/admin/updateProduct/:id', authMiddleware , isAdmin, upload.single('image'),productController.updateProduct);
 router.get('/admin/singleProduct/:id',authMiddleware , isAdmin, productController.productsingle);


  module.exports = router;
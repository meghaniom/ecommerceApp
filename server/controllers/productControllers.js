const Product = require('../models/productsModel');


  exports.productAdd  = async(req, res) => {
    try {
       const {name, description, price, category, stock} = req.body;
       const image = req.file?req.file.filename : null;

        const newProduct = new Product({
            name, 
            description,
            price,
            category,
            stock,
            image
        });

        await newProduct.save();
        res.status(201).json({message : 'Product added successfully', product : newProduct});
    }
    catch (err) {
        res.status(500).json({message : "Something went wrong", error : err});
    }
 };
 

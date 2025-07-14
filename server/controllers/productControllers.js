const Product = require("../models/productsModel");
const fs = require("fs");
const path = require("path");

//  only for admin to add the product
exports.productAdd = async (req, res) => {
  try {
    const { productTitle, description, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({
      productTitle,
      description,
      price,
      category,
      stock,
      image,
      userId: req.user.id,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
//   user and admin access only
exports.productGet = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(201)
      .json({ message: "Product fetched successfully", products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went  wrong", error: error.message });
  }
};
//  admin access only
exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .json({
        message: "Product deleted successfully",
        product: deleteProduct,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

//     admin access only update product

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productTitle, description, price, category, stock } = req.body;
    const newImage = req.file ? req.file.filename : null;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete old image if new one is uploaded
    if (newImage && product.image) {
      const oldImagePath = path.join(__dirname, "..", "uploads", product.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err.message);
        } else {
          console.log("Old image deleted:", product.image);
        }
      });
    }

    const updateFields = {
      productTitle,
      description,
      price,
      category,
      stock,
    };

    if (newImage) {
      updateFields.image = newImage;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};


//  admin use only

exports.productsingle = async(req, res) => {
    try {
        const {id } = req.params;

         const product = await Product.findById(id);
          if(!product) {
             return res.status(404).json({message : "Product not found"});
          }
           return res.status(201).json({message : "Product found", product : product});
    }
    catch (error) {
        return res.status(500).json({ message: "some thing went wrong",   error : error.message});
    }
};
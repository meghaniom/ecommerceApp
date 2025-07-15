const Cart = require("../models/cartModel");
const Product = require("../models/productsModel");

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
 console.log("productId:", productId);
  console.log("quantity:", quantity);
  console.log("userId:",userId);

  try {
    const product = await Product.findById(productId);
    console.log('product',product);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId }); 
    console.log(cart);
    

if (cart) {
  const index = cart.cartItems.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (index > -1) {
    cart.cartItems[index].quantity += quantity;
  } else {
    cart.cartItems.push({ productId, quantity });
  }
} else {
  
  cart = new Cart({
    userId,
    cartItems: [{ productId, quantity }],
  });
}
    let total = 0;
    for (const item of cart.cartItems) {
      const prod = await Product.findById(item.productId);
      console.log('prod',prod);
      
      if (prod) {
        total += prod.price * item.quantity;
      }
    }
    cart.totalPrice = total;
    await cart.save();
    await cart.populate({
        path : "cartItems.productId",
        select : "productTitle price image"
    });
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

exports.removeCart = async (req, res) => {
    const userId = req.user.id;
    const {productId} = req.body;

    try {
        let cart = await Cart.findOne({userId});

         if(!cart) {
             return res.status(404).json({ error: "Cart not found" });
         }

         const initialLength  = cart.cartItems.length;
         cart.cartItems = cart.cartItems.filter((item) => item.productId.toString() !== productId);

          if (cart.cartItems.length === initialLength) {
            return res.status(404).json({error : "Product not found in cart"});
          }
          let total = 0;
    for (const item of cart.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }
    cart.totalPrice = total;
     await cart.save();
    await cart.populate({
      path: "cartItems.productId",
      select: "productTitle price image",
    });
    res.status(200).json({
      message: "Item removed from cart successfully",
      cart,
    });
    }
    catch (error) {
console.error(error);
    res.status(500).json({ error: "Failed to remove item from cart" });
    }
};


 exports.getCart  = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({userId}).populate({
            path : "cartItems.productId",
            select  : "productTitle price image",
        });
         if (!cart) {
             return res.status(404).json({message : "cart  is empty"});
         }
          res.status(200).json({message : "cart fetched successfully",
            cartItems : cart.cartItems,
            totalPrice : cart.totalPrice,
          });
    }
     catch(error) {
         return res.status(500).json({error : "Failed to fetch cart"});
     }

 };

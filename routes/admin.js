const express = require("express");
const adminRouter = express.Router();
const admin = require("../middleware/admin");
const { Product } = require("../models/product");
const User  = require("../models/user");
const  Order = require("../models/order");

// Add product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    const { name, description, images, quantity, price, category } = req.body;
    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

adminRouter.get("/admin/get-products", admin, async (req, res) => {
      try {
        const products =await Product.find();
        res.json(products);

      } catch (error) {
        res.status(500).json({ error: error.message });
  }

});
adminRouter.delete("/admin/delete-product", admin, async (req, res) => {
    try{
      const {id} = req.body;
      let product = await Product.findByIdAndDelete(id);
      res.json(product);
    }
    catch(error){
      res.status(500).json({ error: error.message });
    }
});

adminRouter.get('/admin/get-orders',admin,async(req,res)=>{
  try {
    const  orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

adminRouter.put('/admin/update-order-status',admin,async(req,res)=>{
  try {
    const {id,status} = req.body;
    let order = await Order.findByIdAndUpdate(id,{status:status},{new:true});
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({error:error.message});
  }

})

module.exports = adminRouter;
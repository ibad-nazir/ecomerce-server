

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const { Product } = require("../models/product");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists " });
        }

        const hasedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            email,
            password: hasedPassword,
            name,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {

        res.status(500).json({ error: e.message });
    }

});


authRouter.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(500).json({ error: "User Doesn't  exists " });
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(500).json({ error: "Incorrect Password " });
        }
        const token = jwt.sign({ id: userExist._id }, "passwordKey");
        res.json({ token, ...userExist._doc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });



authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });

});

authRouter.get('/category-products',auth,async(req,res) => {
        
        let product = await Product.find();
});



// authRouter.get("/api/users", async (req, res) => {
//     try {
//         res.json({ "data ": "users" });
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });
module.exports = authRouter;







const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 3000;

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');



mongoose.connect("mongodb+srv://ibad:566446644@cluster0.ydtjr0k.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('Connected to MongoDB')).catch(err => console.log(er));
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(userRouter);
app.use(productRouter);


app.listen(port, "0.0.0.0", () => console.log(`Server listening on ports ${port}!`));


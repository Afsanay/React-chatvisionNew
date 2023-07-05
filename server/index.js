const express=require('express');
const dotenv=require('dotenv');
const dbConnect=require('./dbconnect');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRouter = require('./authrouter')
const { signupController, loginController, logOutController } = require('./authcontroller');

const router=require('express').Router();
dotenv.config('./.env');
const app=express();

//middlewares
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use("*",cors({
    credentials:true,
    origin:process.env.FRONTEND_ADDRESS
}));

app.get("/",(req,res)=>{
    res.status(200).send("OK From Server");
})

dbConnect();
app.use('/auth',authRouter);
const PORT=process.env.PORT || 4001;
app.listen(PORT,()=>{
    console.log("Listening on port "+PORT);
});
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const pass = await bcrypt.hash(password, 5);
    const user = new UserModel({ name, email, password: pass, isAdmin });
    await user.save();
    res.status(201).send({ message: "User has been registered" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

userRouter.post("/login",async (req,res)=>{
    const {  email, password } = req.body;
  try {
   
    const user = await UserModel.findOne({ email});

    if(user){
       let hash = user.password 
      bcrypt.compare(password, hash, function(err, result) {
            if(result){  
                res.status(201).send({ message: "Login Successful" });
            }
        });
    }
   
    
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

module.exports = { userRouter };

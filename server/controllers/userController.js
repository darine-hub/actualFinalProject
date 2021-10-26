const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const newBody = JSON.parse(req.body.info);
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
    }


    const existUser = await User.findOne({ email: newBody.email });
    if (existUser) {
     return res.status(401).json({ msg: "user already exist" });
    }
    const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
console.log(req.file.filename)
    

    const hashedPassword = await bcrypt.hash(newBody.password , 10);

    const newUser = await User.create({
      email: newBody.email,
      password: hashedPassword ,
      firstName: newBody.firstName,
      lastName: newBody.lastName,
      image: imagePath,
      age: newBody.age,
      familySituation: newBody.familySituation,
      tel: newBody.tel,
      title: newBody.title,
      departement: newBody.departement,
      adress: newBody.adress,
      role: newBody.role,
    });


    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    return res.json({ user: newUser, token });
  } catch (error) {
   // return res.status(500).json({msg:'hello'})
    console.log(error)

  }
};




const updateUserImage = async (req, res) => {
  try {
    const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
  console.log('helllllloooo')
    console.log(imagePath)
  
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      image: imagePath,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser)
      res.status(400).json({ message: "you must register first!" });

      if (existUser.blocked === true)
      res.status(400).json({ message: "we are sorry you are bloqued!" });  

    const validatePassword = await bcrypt.compare(password, existUser.password);
    if (!validatePassword)
      res.status(400).json({ message: "wrong password ! try again!" });
    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.SECRET_KEY
    );
    res.json({ user: existUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const afficheController = async (req, res) => {
  try {
    const listUsers = await User.find();
    res.status(200).json(listUsers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUserController = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(newUser);
  } catch (error) {
  res.status(500).json({ message: error });}
};

const deleteUserController = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(userDeleted);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



const updateStateUserController = async (req,res)=>{
  try {
      
     const newUser = await User.findByIdAndUpdate(req.params.id,{ 

blocked:true,

      
     });
     res.status(200).json(newUser)
      
  } catch (error) {
      res.status(500).json({message:error})  
  }
  
  
  }



module.exports = {
  registerController,
  loginController,
  afficheController,
  updateUserController,
  deleteUserController,
  updateUserImage,
  updateStateUserController
};

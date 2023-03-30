const { User } = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {sendingEmail }= require('./nodemailer')

const createUser = async (req, res) => {
 try{
  const {
    email,
    name,
    gender,
    password,
    phone,
    college
  } = req.body;
 

  //password hashing
  const salt = bcrypt.genSaltSync(10);
  const bcrypt_password = bcrypt.hashSync(password, salt);

  const newUser=new User({
    email,
    name,
    gender,
    password : bcrypt_password,
    phone,
    college
  })
  const userEmail=newUser.email;
  const createUser = await newUser.save();
  res.status(200).send(createUser);
  sendingEmail({userEmail});

 }catch(error){
  res.status(500).send(error.message);
 }

};

const getAllUser = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).send(getUsers);
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const oldUser = await User.findOne({ email })
  if (!oldUser) {
    res.status(404).json({
      msg: 'User Not Found',
    })
  }
 
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({email: oldUser.email, name: oldUser.name,phone: oldUser.phone}, process.env.JWT_SECRET)

    if (res.status(201)) {
      return res.status(201).send({token :  token })
    } 
    else {
      return res.status(500).send({ message: 'error' })
    }
  }
  res.status(401).send({message : "Invalid password"})
}


module.exports = {
  createUser,
  getAllUser,
  loginUser,
};




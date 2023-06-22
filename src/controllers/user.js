const { User } = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {sendingEmail }= require('./nodemailer')

const createUser = async (req, res) => {
 try{
  const {
    email,
    username,
    password,
    phone,
    isZairzaMember,
    yearOfPassout
  } = req.body;
 

  //password hashing
  const salt = bcrypt.genSaltSync(10);
  const bcrypt_password = bcrypt.hashSync(password, salt);

  const newUser=new User({
    email,
    username,
    password : bcrypt_password,
    phone,
    isZairzaMember,
    yearOfPassout
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

  if (!email || !password) {
    res.status(400).send({
      msg:"Please Provide Email And Password"
    })
  }

  const oldUser = await User.findOne({ email })
  if (!oldUser) {
    res.status(401).send({
      msg: 'Please Provide Correct Credentials',
    })  
  }
 
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({email: oldUser.email, username: oldUser.username,phone: oldUser.phone,isZairzaMember:oldUser.isZairzaMember}, process.env.JWT_SECRET)

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




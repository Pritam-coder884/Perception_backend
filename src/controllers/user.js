const { User } = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

  //finding existing users
  const oldUser = await User.find({ email })
    if (oldUser.length != 0) {
      return res.status(401).json({ error: 'User Already Exists' })
    }

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
  const createUser = await newUser.save();
  res.status(200).send(createUser);

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
  loginUser
};



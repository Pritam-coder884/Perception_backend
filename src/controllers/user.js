const { User } = require("../models");

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
  const newUser=new User({
    email,
    name,
    gender,
    password,
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

module.exports = {
  createUser,
  getAllUser,
};

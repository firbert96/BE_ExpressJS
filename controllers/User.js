const Model = require("../models");
const {Users} = Model;
const Bcrypt = require('bcryptjs');
const { 
  v4: uuidv4,
} = require('uuid');

module.exports = {
  async add(req, res) {
    const {firstName,lastName,email,password}=req.body;
    try {
      const  salt = await Bcrypt.genSaltSync(10);
      const  passwordDigest = await Bcrypt.hashSync(password,salt);
      const params = {
        id:uuidv4(),
        firstName,
        lastName,
        email,
        password: passwordDigest,
      }
      const users = await Users.create(params);
      return res.status(201).send(users)
    }
    catch (err) {
      return res.status(422).json({error: err.message});
    }
  },

  
};
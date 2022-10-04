const Model = require("../models");
const {Users} = Model;
const Bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const { 
  v4: uuidv4,
} = require('uuid');
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

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
      const token = jwt.sign({ id: users.id }, process.env.SECRET_KEY, {
        expiresIn: 30*86400
      });
      await Users.update(
        {
          token,
        },
        {
          where: {
            id: {
              [Op.eq]: users.id
            }
          }
        }
      );
      return res.status(201).send({users,token})
    }
    catch (err) {
      return res.status(422).json({error: err.message});
    }
  },

  async getAll(req, res){
    try {
      const users = await Users.findAll();
      return res.status(200).send(users)
    }
    catch(err) {
      return res.status(422).json({error: err.message});
    }
  },

  async getById(req, res){
    const {id}=req.query;
    try {
      const users = await Users.findAll({
        where: {
          id: {
            [Op.eq]: id
          }
        }
      });
      return res.status(200).send(users)
    }
    catch(err) {
      return res.status(422).json({error: err.message});
    }
  },

  async login (req,res){
    const {email,password}=req.body;
    try {
      const login = await Users.findOne({email});
      if(!login){
          return res.status(400).send('Email not found');
      }
      const result = await Bcrypt.compareSync(password,login.password);
      if(result){
          const token = jwt.sign({ id: login.id }, process.env.SECRET_KEY);
          await Users.update(
          {
            token,
          },
          {
            where: {
              id: {
                [Op.eq]: login.id
              }
            }
          });
          return res.status(200).send(token)
      }
      else{
        return res.status(400).send('Password isn\'t match');
      }
    }
    catch (error) {
      return res.status(422).send(error);
    }
  },

  async update(req, res){
    const {id,firstName,lastName,email}=req.body;
    try {
      const users = await Users.update(
      {
        firstName,
        lastName,
        email,
        updatedAt: moment().format()
      },
      {
        where: {
          id: {
            [Op.eq]: id
          }
        }
      });
      if(users){
        return res.status(200).json({msg: 'Successfully update user'});
      }
      return res.status(404).send(users);
    }
    catch(err) {
      return res.status(422).json({error: err.message});
    }
  },

  async deleteSoft(req, res){
    const {id}=req.query;
    try {
      const users = await Users.update(
      {
        isDeleted:true,
      },
      {
        where: {
          id: {
            [Op.eq]: id
          }
        }
      });
      if(users){
        return res.status(200).json({msg: 'Successfully delete user'});
      }
      return res.status(404).send(users);
    }
    catch(err) {
      return res.status(422).json({error: err.message});
    }
  },

  async deleteHard(req, res){
    const {id}=req.query;
    try {
      const users = await Users.destroy(
      {
        where: {
          id: {
            [Op.eq]: id
          }
        }
      });
      if(users){
        return res.status(200).json({msg: 'Successfully delete user'});
      }
      return res.status(404).send(users);
    }
    catch(err) {
      return res.status(422).json({error: err.message});
    }
  },

  async logout(req, res){
    const {userId}=req;
    try {
      await Users.update(
      {
        token:null,
      },
      {
        where: {
          id: {
            [Op.eq]: userId
          }
        }
      });
      return res.status(200).json({msg: 'Successfully logout user'});
    }
    catch(err) {
      return res.status(422).json({error: err.message});
    }
  },
};
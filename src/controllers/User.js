const Response = require('../general/Response');
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
    let status = false;
    let message = 'Create user failed';
    let param = null;
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
      users.token = token;
      status = true;
      message = 'Create user success';
      param = {
        users,
      };
      return res.status(201).json(Response.Format(status, message, param));
    }
    catch (err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async getAll(req, res){
    let status = false;
    let message = 'Get all user failed';
    let param = null;
    try {
      const users = await Users.findAll({
        where: { isDeleted: false }
      });
      status = true;
      message = 'Get all user success';
      param = {
        users,
      };
      return res.status(200).json(Response.Format(status, message, param));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async getById(req, res){
    const {id}=req.query;
    let status = false;
    let message = 'Get user by id failed';
    let param = null;
    try {
      const users = await Users.findAll({
        where: {
          id: {
            [Op.eq]: id
          }
        }
      });
      status = true;
      message = 'Get user by id success';
      param = {
        users,
      };
      return res.status(200).json(Response.Format(status, message, param));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async login (req,res){
    const {email,password}=req.body;
    let status = false;
    let message = 'Login user failed';
    let param = null;
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
          status = true;
          message = 'Login user success';
          param = {
            token,
          };
          return res.status(200).json(Response.Format(status, message, param));
      }

      message= 'Password isn\'t match';
      return res.status(400).json(Response.Format(status, message, message));
    }
    catch (err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async update(req, res){
    const {id,firstName,lastName,email}=req.body;
    let status = false;
    let message = 'Update user failed';
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
        status = true;
        message = 'Update user success';
        return res.status(200).json(Response.Format(status, message, message));
      }
      message= 'Password isn\'t match';
      return res.status(404).json(Response.Format(status, message, message));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async deleteSoft(req, res){
    const {id}=req.query;
    let status = false;
    let message = 'Delete user failed';
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
        status = true;
        message = 'Delete user success';
        return res.status(200).json(Response.Format(status, message, message));
      }
      return res.status(404).json(Response.Format(status, message, message));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async deleteHard(req, res){
    const {id}=req.query;
    let status = false;
    let message = 'Delete user failed';
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
        status = true;
        message = 'Delete user success';
        return res.status(200).json(Response.Format(status, message, message));
      }
      return res.status(404).json(Response.Format(status, message, message));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },

  async logout(req, res){
    const {userId}=req;
    let status = false;
    let message = 'Logout user failed';
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
      status = true;
      message = 'Logout user success';
      return res.status(200).json(Response.Format(status, message, message));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },
  
  async me(req, res){
    const {userId}=req;
    let status = false;
    let message = 'Get me failed';
    let param = null;
    try {
      const users = await Users.findAll({
        where: {
          id: {
            [Op.eq]: userId
          }
        }
      });
      status = true;
      message = 'Get me success';
      param = {
        users,
      };
      return res.status(200).json(Response.Format(status, message, param));
    }
    catch(err) {
      return res.status(422).json(Response.Format(status, message, err.message));
    }
  },
};
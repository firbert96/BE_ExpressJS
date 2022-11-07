const Joi = require('joi');
const VR = require('./ValidateRequest');

module.exports = { 
    add(req,res,next) {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().min(6).required(),
        });
        VR.ValidateRequestBody(req, next, schema);
    },
    getById(req,res,next) {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        VR.ValidateRequestQuery(req, next, schema);
    },
    update(req,res,next) {
        const schema = Joi.object({
            id: Joi.string().required(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string(),
        });
        VR.ValidateRequestBody(req, next, schema);
    },
};
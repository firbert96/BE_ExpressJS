const Joi = require('joi');
const VR = require('./ValidateRequest');

module.exports = { 
    add(req,res,next) {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        VR.ValidateRequest(req, next, schema);
    },
};
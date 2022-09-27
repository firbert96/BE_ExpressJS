module.exports = { 
    ValidateRequestBody(req, next, schema) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } else {
            req.body = value;
            next();
        }
    },
    ValidateRequestQuery(req, next, schema) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
        const { error, value } = schema.validate(req.query, options);
        if (error) {
            next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } else {
            req.query = value;
            next();
        }
    },
}
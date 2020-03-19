const Joi = require('@hapi/joi')

module.exports = {
    // POST
    register: {
        body: {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(6)
                .max(128)
        }
    },
    login: {
        body: {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(6)
                .max(128)
        }
    }
};

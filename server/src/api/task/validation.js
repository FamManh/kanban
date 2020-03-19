const { Joi } = require("express-validation");

exports.createValidation = {
    body: Joi.object({
        name: Joi.string()
            .min(1)
            .max(128)
            .required(),
        description: Joi.string()
            .max(2000),
        columnId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        color: Joi.string()
            .required()
            .min(1)
            .max(20),
        labels: [Joi.string()],
        members: [
            {
                userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/)
            }
        ],
        sortOrder: Joi.number().required()
    })
};

exports.deleteValidation = {
    params: Joi.object({
        taskId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};

exports.updateValidation = {
    params: Joi.object({
        taskId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    }),
    body: Joi.object({
        name: Joi.string()
            .min(1)
            .max(128),
        description: Joi.string().max(2000),
        columnId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
        color: Joi.string().max(20),
        labels: [Joi.string()],
        members: [
            {
                userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/)
            }
        ],
        sortOrder: Joi.number()
    })
};

exports.getValidation = {
    params: Joi.object({
        taskId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};

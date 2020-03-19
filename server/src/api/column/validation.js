const { Joi } = require("express-validation");

exports.createValidation = {
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(128)
            .required(),
        description: Joi.string()
            .min(3)
            .max(2000),
        boardId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
        taskProperties: {
            showDescription: Joi.boolean(),
            showLabel: Joi.boolean(),
            limitTaskCount: Joi.number()
        }
    })
};

exports.deleteValidation = {
    params: Joi.object({
        columnId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};

exports.updateValidation = {
    params: Joi.object({
        columnId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    }),
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(128),
        description: Joi.string()
            .min(3)
            .max(2000),
        boardId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
        taskProperties: {
            showDescription: Joi.boolean(),
            showLabel: Joi.boolean(),
            limitTaskCount: Joi.number()
        }
    })
};

exports.getValidation = {
    params: Joi.object({
        columnId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};

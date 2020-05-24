const { Joi } = require("express-validation");

exports.listValidation = {
    query: Joi.object({
        name: Joi.string()
    })
};

exports.createValidation = {
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(128)
            .required(),
        colors: [
            {
                color: Joi.string().max(20),
                name: Joi.string().max(128)
            }
        ],
        members: [Joi.string().regex(/^[a-fA-F0-9]{24}$/)],
        columns: Joi.array().items(Joi.object({
            name: Joi.string().required()
        }))
    })
};

exports.deleteValidation = {
    params: Joi.object({
        boardId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};

exports.updateValidation = {
    params: Joi.object({
        boardId: Joi.string()
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    }),
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(128),
        colors: [
            {
                color: Joi.string().max(20),
                name: Joi.string().max(128)
            }
        ],
        members: [Joi.string().regex(/^[a-fA-F0-9]{24}$/)]
    })
};

exports.getValidation = {
    params: Joi.object({
        boardId: Joi.string()
            .min(6)
            // .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};

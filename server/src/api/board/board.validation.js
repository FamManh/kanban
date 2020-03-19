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
        members: [Joi.string().regex(/^[a-fA-F0-9]{24}$/)]
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
            .regex(/^[a-fA-F0-9]{24}$/)
            .required()
    })
};


// module.exports = {
//     // GET /v1/branchs
//     list: Joi.object({
//         query: {
//             name: Joi.string()
//         }
//     }),

//     // POST /v1/branchs
//     create: Joi.object({
//         body: {
//             name: Joi.string()
//                 .min(3)
//                 .max(128)
//                 .required(),
//             owner: Joi.string()
//                 .regex(/^[a-fA-F0-9]{24}$/)
//                 .required(),
//             colors: [
//                 {
//                     color: Joi.string().max(20),
//                     name: Joi.string().max(128)
//                 }
//             ],
//             members: [Joi.string().regex(/^[a-fA-F0-9]{24}$/)]
//         }
//     }),

//     update: Joi.object({
//         body: {
//             name: Joi.string()
//                 .min(3)
//                 .max(128),
//             owner: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
//             colors: [
//                 {
//                     color: Joi.string().max(20),
//                     name: Joi.string().max(128)
//                 }
//             ],
//             members: [Joi.string().regex(/^[a-fA-F0-9]{24}$/)]
//         },
//         params: {
//             boardId: Joi.string()
//                 .regex(/^[a-fA-F0-9]{24}$/)
//                 .required()
//         }
//     }),

//     remove: Joi.object({
//         params: {
//             boardId: Joi.string()
//                 .regex(/^[a-fA-F0-9]{24}$/)
//                 .required()
//         }
//     }),

//     get: Joi.object({
//         params: {
//             boardId: Joi.string()
//                 .regex(/^[a-fA-F0-9]{24}$/)
//                 .required()
//         }
//     })
// };

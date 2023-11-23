const joi = require("joi");

const joiUserSchema = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(3).max(30),
    password: joi.string().required(),
});

// const joiProductSchema = Joi.object({
//     id:Joi.string(),
//     title: Joi.string().required(),
//     description:Joi.string(),
//     price: Joi.number().positive(),
//     image: Joi.string(),
//     category:Joi.string(),
// });

module.exports = {
    joiUserSchema, 
    // joiProductSchema
};

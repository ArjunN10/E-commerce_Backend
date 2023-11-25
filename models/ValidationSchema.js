const joi = require("joi");

const joiUserSchema = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    username: joi.string().alphanum().min(3).max(30),
    password: joi.string().required(),
});


const joiProductSchema=joi.object({
    id: joi.string(),
    title: joi.string().required(),
    image: joi.string(),
    price: joi.number().positive(),
    category: joi.string(),
    description: joi.string(),
});



module.exports = {
    joiUserSchema, 
    joiProductSchema
};

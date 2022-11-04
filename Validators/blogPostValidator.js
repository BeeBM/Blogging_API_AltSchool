const Joi = require('joi');

const CreateBlogPostSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .trim(), 
    author: Joi.string()
        .min(10)
        .required()
        .trim(),
    state: Joi.string()
        .required(),
    read_count: Joi.number()
        .min(0)
        .max(100)
        .required(),
    reading_time: Joi.string()
        .min(10)
        .required(),
    image: Joi.string()
        .min(10)
        .max(500)
        .required()
        .trim(), 
    imageDescription: Joi.string()
        .min(10)
        .max(200)
        .required()
        .trim(), 
    createAt: Joi.date()
        .default(Date.now),
    lastUpdateAt: Joi.date()
        .default(Date.now)
})



const EditBlogPostSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .trim(), 
    state: Joi.string()
        .required(),
    read_count: Joi.number()
        .min(0)
        .max(100)
        .required(),
    reading_time: Joi.string()
        .min(10)
        .required(),
    image: Joi.string()
        .min(10)
        .max(500)
        .required()
        .trim(), 
    imageDescription: Joi.string()
        .min(10)
        .max(200)
        .required()
        .trim(), 
    createAt: Joi.date()
        .default(Date.now),
    lastUpdateAt: Joi.date()
        .default(Date.now)
})



async function CreateBlogPostValidationMW(req, res, next) {
    const blogPostPayLoad = req.body

    try {
        await CreateBlogPostSchema.validateAsync(blogPostPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function EditBlogPostValidationMW(req, res, next) {
    const blogPostPayLoad = req.body

    try {
        await EditBlogPostSchema.validateAsync(blogPostPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    CreateBlogPostValidationMW,
    EditBlogPostValidationMW
}
const Joi = require('joi');

const AddBloggerSchema = Joi.object({
    firstname: Joi.string()
        .max(255) 
        .trim()
        .required(),
    lastname: Joi.string()
        .max(255)
        .required()
        .trim(),
    email: Joi.string()
        .max(255)
        .required(),
    country: Joi.string()
        .optional(),
    createAt: Joi.date()
        .default(Date.now),
    lastUpdateAt: Joi.date()
        .default(Date.now)
})


const UpdateBloggerSchema = Joi.object({
    firstname: Joi.string()
        .max(255) 
        .trim()
        .required(),
    lastname: Joi.string()
        .max(255)
        .required()
        .trim(),
    country: Joi.string()
        .optional(),
    createAt: Joi.date()
        .default(Date.now),
    lastUpdateAt: Joi.date()
        .default(Date.now)
})



async function AddAuthorValidationMW(req, res, next) {
    const bloggerPayLoad = req.body

    try {
        await AddBloggerSchema.validateAsync(bloggerPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateAuthorValidationMW(req, res, next) {
    const bloggerPayLoad = req.body

    try {
        await UpdateBloggerSchema.validateAsync(bloggerPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

module.exports = {
    AddAuthorValidationMW,
    UpdateAuthorValidationMW
}
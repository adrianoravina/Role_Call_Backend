const Joi = require('joi')

const appSchema = {

    name: Joi.string().min(1).required(),
    completed: Joi.boolean()
}

exports.validateApp = (task) => Joi.validate(app, appSchema)
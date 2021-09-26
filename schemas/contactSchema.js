const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/).required(),
})

module.exports = contactSchema

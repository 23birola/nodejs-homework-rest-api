const Joi = require('joi')

const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
})

module.exports = contactUpdateSchema

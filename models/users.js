const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
    minlength: 6
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  avatarURL: {
    type: String
  },
  token: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function() {
  const payload = {
    _id: this._id
  }
  return jwt.sign(payload, SECRET_KEY)
}

const userJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const userVarificationJoiSchema = Joi.object({
  email: Joi.string().required()
})

const User = model('user', userSchema)

module.exports = {
  User,
  userJoiSchema,
  userVarificationJoiSchema
}

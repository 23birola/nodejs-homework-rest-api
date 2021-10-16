const { Conflict } = require('http-errors')
const { User } = require('../../models')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const { sendEmail } = require('../../helpers')

const register = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already register')
  }
  const verifyToken = v4()
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL, verifyToken })
  newUser.setPassword(password)
  await newUser.save()

  const data = {
    to: email,
    subject: 'Підтвердження реєстрації на сайті',
    html: `<a href="http://localhost:3000/api/auth/users/verify/${verifyToken}" target="_blank">Підтвердити пошту</a>`
  }
  await sendEmail(data)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register'
  })
}

module.exports = register

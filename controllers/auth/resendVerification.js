const { BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const resendVerification = async(req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  if (!user) {
    throw new BadRequest('Invalid email')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const data = {
    to: email,
    subject: 'Підтвердження реєстрації на сайті',
    html: `<a href="http://localhost:3000/api/auth/users/verify/${user.verifyToken}" target="_blank">Підтвердити пошту</a>`
  }
  await sendEmail(data)
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = resendVerification

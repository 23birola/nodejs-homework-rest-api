const { User } = require('../../models')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const getCurrentUser = async (req, res) => {
  const { authorization } = req.headers
  const [bearer, token] = authorization.split(' ')
  const { _id } = jwt.verify(token, SECRET_KEY)
  const currentUser = await User.findById(_id, 'mail subscription')
  res.json({
    status: 'success',
    code: 200,
    data: currentUser
  })
}

module.exports = getCurrentUser

const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const verifyUser = require('./verifyUser')
const resendVerification = require('./resendVerification')

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser,
  resendVerification
}

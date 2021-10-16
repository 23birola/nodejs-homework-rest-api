const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const verifyUser = require('./verifyUser')

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser
}

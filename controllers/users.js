const { sendSuccessRes, resizeImage } = require('../helpers')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const path = require('path')
const fs = require('fs/promises')
const avatarsDir = path.join(__dirname, '../', 'public/avatars')

const changeAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file
  await resizeImage(`${tempStorage}`)
  try {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(' ')
    const { _id } = jwt.verify(token, SECRET_KEY)
    const [extention] = originalname.split('.').reverse()
    const newFileName = `user_avatar_${_id}.${extention}`
    const resultStorage = path.join(avatarsDir, newFileName)
    await fs.rename(tempStorage, resultStorage)
    const avatarURL = path.join('/avatars', newFileName)
    const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    sendSuccessRes(res, { user })
  } catch (error) {
    await fs.unlink(tempStorage)
    throw error
  }
}

module.exports = {
  changeAvatar
}

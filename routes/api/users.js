const express = require('express')
// const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contacts')
const { controllerWrapper } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { upload } = require('../../middlewares')

const router = express.Router()

router.patch('/avatars', upload.single('avatar'), controllerWrapper(ctrl.changeAvatar))

module.exports = router

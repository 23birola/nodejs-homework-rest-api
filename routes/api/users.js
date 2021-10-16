const express = require('express')
const { controllerWrapper } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { upload, authenticate } = require('../../middlewares')

const router = express.Router()

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.changeAvatar))

module.exports = router

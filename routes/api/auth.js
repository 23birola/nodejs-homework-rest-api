const express = require('express')

const { userJoiSchema } = require('../../models/users')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

/*
1. Регистраця нового нового пользователя.
2. Аутентификациия (логин) зарегистрированного пользователя.
3. Авторизация аутентифицированного (зашедшего на сайт) пользователя.
4. Выход (Logout).
*/
// api/auth/register
router.post('/users/register', validation(userJoiSchema), controllerWrapper(ctrl.register))
// router.post("/signup")

router.post('/users/login', validation(userJoiSchema), controllerWrapper(ctrl.login))
// // router.post("/signin")

router.get('/users/logout', authenticate, controllerWrapper(ctrl.logout))
// // router.get("/signuot")

router.get('/users/current', authenticate, controllerWrapper(ctrl.getCurrentUser))

module.exports = router

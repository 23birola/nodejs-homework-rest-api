const express = require('express')
const { contactSchema, contactUpdateSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch('/:contactId', validation(contactUpdateSchema), controllerWrapper(ctrl.updateContactById))

module.exports = router

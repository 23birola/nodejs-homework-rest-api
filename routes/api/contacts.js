const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model')
const { contactSchema } = require('../../schemas')

router.get('/', async (req, res, next) => {
  try {
    // console.log('req', req.body)
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    console.log(result)
    res.json({
      status: 'success',
      code: 200,
      message: 'Success delete',
      data: result
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    console.log(req.body)
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields'
      })
      return
    }
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContactsById(contactId, req.body)
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router

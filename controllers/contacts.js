const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../helpers')
const contactsOperations = require('../model')

const listContacts = async(req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessRes(res, { result })
}

const getContactById = async(req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const addContact = async(req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { result }, 201)
}

const updateContactById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing fields'
    })
    return
  }
  const { contactId } = req.params
  const result = await contactsOperations.updateContactsById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeContact = async(req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete', result })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact
}

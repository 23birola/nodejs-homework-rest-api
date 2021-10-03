const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../helpers')
const { Contact } = require('../models')

const listContacts = async(req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSuccessRes(res, { result })
}

const getContactById = async(req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, '_id name email phone favorite')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
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
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const updateFavoriteByID = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing field favorite'
    })
    return
  }
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeContact = async(req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
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
  updateFavoriteByID,
  removeContact
}

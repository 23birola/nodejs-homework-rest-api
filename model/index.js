const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const updateContacts = require('./updateContacts')
const updateContactsById = require('./updateContactsById')
const removeContact = require('./removeContact')

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContacts,
  removeContact,
  updateContactsById
}

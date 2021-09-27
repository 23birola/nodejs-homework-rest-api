// const fs = require('fs/promises')
// const path = require('path')
const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

// const filePath = path.join(__dirname, './contacts.json')

const updateContactsById = async (id, newContact) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...newContact }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateContactsById

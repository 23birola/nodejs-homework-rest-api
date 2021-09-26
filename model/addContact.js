const { v4 } = require('uuid')

const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await updateContacts(contacts)
  console.log('The contact has been successfully added')
  return newContact
}

module.exports = addContact

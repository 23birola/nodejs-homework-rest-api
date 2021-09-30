const { v4 } = require('uuid')

const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  console.log('The contact has been successfully added')
  return newContact
}

module.exports = addContact

const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(item => String(item.id) === String(contactId))
  if (!contact) { return null }
  return contact
}

module.exports = getContactById

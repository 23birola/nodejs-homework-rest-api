const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => String(item.id) === String(contactId))
  if (idx === -1) { return null }
  const removedContact = contacts.splice(idx, 1)
  await updateContacts(contacts)
  // console.log("Сontact successfully deleted!")
  return removedContact
}

module.exports = removeContact

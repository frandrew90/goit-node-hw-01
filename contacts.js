const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    // console.log(contacts);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === Number(contactId)
    );
    return console.log(contactById);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newList = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    console.log(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const newContactList = contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(newContactList));
    console.log(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// addContact("AAAAA", "BBBBBBBBB", "CCCCCCCCC");

// listContacts().then((data) => console.log(data));
// getContactById(11);
// removeContact(11);

// // =================
// function listContacts() {
//   fs.readFile(contactsPath)
//     .then((data) => console.log(data.toString()))
//     .catch((err) => console.log(err.message));
// }

// function getContactById(contactId) {
//   listContacts()
//     .then((data) => {
//       data.find((contact) => {
//         contact.id === contactId;
//       });
//     })
//     .catch((err) => console.log(err.message));
// }

// getContactById(1);

//   function removeContact(contactId) {
//     // ...твой код
//   }

//   function addContact(name, email, phone) {
//     // ...твой код
//   }

// console.log("====================================");
// console.log(fs);
// console.log("====================================");

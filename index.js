const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.log(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (!contactById) {
          console.log(`There is no contacts with id: ${id}`);
          return;
        }
        console.log(contactById);
        console.log(`The contact found successfully`);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        console.log(`The contact was successfully added`);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        if (!removedContact) {
          console.log(`There is no contacts with id: ${id}`);
          return;
        }
        console.log(removedContact);
        console.log(`The contact was successfully removed`);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
};

invokeAction(argv);

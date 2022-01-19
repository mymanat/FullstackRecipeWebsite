const { dbService } = require('./database.service');
const defaultContacts = require('../data/defaultContacts.json');

const CONTACTS_COLLECTION = 'contacts';

class ContactsService {
  constructor() {
    this.dbService = dbService;
  }

  /**
   * @returns la collection de contacts de la BD
   */
  get collection() {
    return this.dbService.db.collection(CONTACTS_COLLECTION);
  }

  /**
   * TODO : Récupérer tous les contacts de la collection
   * @returns les contacts de la collection
   */
  async getAllContacts() {
    return this.collection.find().toArray();
  }

  /**
   * TODO : Ajouter un nouveau contact dans la liste des contacts en écrivant dans la collection
   * @param {*} newContact : le nouveau contact à ajouter
   */
  async addNewContact(contact) {
    return this.collection.insertOne(contact);
  }

  /**
   * TODO : Supprimer le contact de la liste en fonction de son id
   * @param {string} id : contact ayant cet id
   * @returns le résultat de la modification
   */
  async deleteContactById(id) {
    return this.collection.findOneAndDelete({id : Number(id)});
  }

  /**
   * Remplir la collection avec les contacts par défaut
   */
  async populateDb() {
    await this.dbService.populateDb(CONTACTS_COLLECTION, defaultContacts.contacts);
  }
}

module.exports = { ContactsService };

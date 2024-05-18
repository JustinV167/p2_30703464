const contactsModel = require("../models/contactsModel");
class contactsController {
    constructor() {
    this.newContacts = new contactsModel();
      this.add = this.add.bind(this);
    }
    async add(req, res) {
        const defaultContact={
                comment:'',
                ...req.body,
                direction:req.ip,
                date: Date.now()
        }
        this.newContacts.insertContact(defaultContact)
        res.redirect('/contacts')
    }
    async readAll(){
      const data=await this.newContacts.AllContacts()
      return data
    }
}
module.exports = contactsController;
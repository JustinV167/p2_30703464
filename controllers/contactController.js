const geoip = require('geoip-lite');
const contactsModel = require("../models/contactsModel");
class contactsController {
    constructor() {
    this.newContacts = new contactsModel();
      this.add = this.add.bind(this);
    }
    async add(req, res) {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(ip);
      console.log(req.ip);
      const geo = geoip.lookup('192.168.1.105');
      console.log(geo);
        const defaultContact={
                comment:'',
                ...req.body,
                direction:req.ip,
                pais:geo?.country??'',
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
const geoip = require('geoip-lite');
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));
const contactsModel = require("../models/contactsModel");
const emailController=require("../controllers/emailController")

class contactsController {
    constructor() {
    this.newContacts = new contactsModel();
      this.add = this.add.bind(this);
      this.emailController=new emailController('Notificador de registro')
    }
    async add(req, res) {
      const geo = geoip.lookup(req.ip)?.country??'VE';
        const defaultContact={
                comment:'',
                ...req.body,
                direction:req.ip,
                pais:countries.getName(geo,'es'),
                date: Date.now()
        }
        this.newContacts.insertContact(defaultContact)
        let onlyDate=new Date(defaultContact.date)
        this.emailController.sendEmails({
          destinys:JSON.parse(process.env.LIST_DESTINY),
          title:'Envio de Comentario',
          message:`El usuario con la ip: ${req.ip} \ncon el nombre: ${defaultContact.name
          }\ndel pais: ${defaultContact.pais} \ndesde el correo: ${defaultContact.email}\n${
            defaultContact.comment!="" && defaultContact.comment?
            `dejó el siguiente comentario: "${defaultContact.comment}"`:
            'ingreso pero no dejo ningun Comentario'
          }\na las ${onlyDate.toLocaleTimeString()} del ${onlyDate.toLocaleDateString()} `
        })
        res.redirect('/contacts')
    }
    async readAll(){
      const data=await this.newContacts.AllContacts()
      return data
    }
}
module.exports = contactsController;
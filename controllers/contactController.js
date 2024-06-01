const geoip = require('geoip-lite');
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));
const contactsModel = require("../models/contactsModel");
const emailController=require("../controllers/emailController")
const axios = require('axios');

class contactsController {
    constructor() {
    this.newContacts = new contactsModel();
      this.add = this.add.bind(this);
      this.emailController=new emailController('Notificador de registro')
    }
    async add(req, res) {
      let recaptchaResponse=req?.body?.['g-recaptcha-response']
      if (!recaptchaResponse) {
        return res.status(400).send("Debe completar el reCAPTCHA");
      }
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

        try {
          const recaptchaSecretKey = process.env.KET_CAPTCHA_PRIV;
    
          const recaptchaVerificationResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
              params: {
                secret: recaptchaSecretKey,
                response: recaptchaResponse,
                remoteip: req.ip,
              },
            }
          );
    
          console.log('Recaptcha verification response:', recaptchaVerificationResponse.data);
    
          if (recaptchaVerificationResponse.data.success) {
            const ip = req.ip;
            const fecha = new Date().toISOString();
            await this.contactosModel.crearContacto(email, name, mensaje, ip, fecha);
    
            const contactos = await this.contactosModel.obtenerAllContactos();
            console.log(contactos);
    
            return res.redirect('/contacts');
          } else {
            console.error('Recaptcha verification failed:', recaptchaVerificationResponse.data['error-codes']);
            return res.status(400).send("Error en la verificación del reCAPTCHA");
          }
        } catch (error) {
          console.error('Error al procesar el formulario de contacto:', error);
          console.error('Error details:', error.response ? error.response.data : error);
          return res.status(500).render('error', { mensaje: 'Error al procesar el formulario' });
        }
      }

    async readAll(){
      const data=await this.newContacts.AllContacts()
      return data
    }
}
module.exports = contactsController;
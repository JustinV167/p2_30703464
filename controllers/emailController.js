const nodemailer = require("nodemailer");
class emailController {
  constructor(alias) {
    this.transporter = null;
    this.alias=alias
    this.host = "smtp.gmail.com";
    this.email = process.env.EMAIL;
    this.generateTransporter()
  }
  generateTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: 587,
      secure: false,
      auth: {
        user: this.email,
        pass: process.env.EMAIL_PASS,
      },
    });
    return;
  }
  async sendOneEmail({ destiny, title, message }) {
    if (destiny == "" || !destiny) {
      console.log("correo a enviar no definido correctamente");
      return;
    }
    let preparateAlias=this.alias?this.alias+' ':''
    return await this.transporter.sendMail({
      from:preparateAlias+ this.email,
      to: destiny,
      subject: title ?? "",
      text:message??''
    });
  }
  async sendEmails({ destinys, title, message }){
    if (destinys.length == 0 || !destinys) {
        console.log("correos a enviar no definidos correctamente");
        return;
      }
      return await this.sendOneEmail({ destiny:destinys.join(','), title, message })
  }
}
module.exports = emailController;

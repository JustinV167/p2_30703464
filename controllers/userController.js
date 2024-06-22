const axios = require('axios');

class usersController {
    constructor() {
      this.add = this.add.bind(this);
    }
    async add(req, res,next) {
      let recaptchaResponse=req?.body?.['g-recaptcha-response']
      if (!recaptchaResponse) {
        return res.status(400).send("Debe completar el reCAPTCHA");
      }
        try {
          const recaptchaSecretKey = process.env.KEY_CAPTCHA_PRIV;
    
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
            return next();
            //fine
          } else {
            console.error('Recaptcha verification failed:', recaptchaVerificationResponse.data['error-codes']);
            return res.status(400).send("Error en la verificación del reCAPTCHA");
          }
        } catch (error) {
          console.error('Error al procesar el formulario de login:', error);
          console.error('Error details:', error.response ? error.response.data : error);
          return res.status(500).render('error', { mensaje: 'Error al procesar el formulario' });
        }
      }
}
module.exports = usersController;

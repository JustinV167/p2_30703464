const express=require("express")
const router= express.Router()
const passport=require("passport")
router.get('/',
    passport.authenticate('google-login', { scope:
        [ 'email', 'profile' ] }
  ));
  
  router.get( '/contacts/contactos',
      passport.authenticate( 'google-login', {
          successRedirect: '/contacts/contactos',
          failureRedirect: '/'
  }));
module.exports= router
let GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const LocalStrategy = require('passport-local').Strategy;
const userModel=require('../models/usersModel')
const newuserModel=new userModel()
const bcrypt=require('bcrypt')
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });


  passport.deserializeUser(async function (user, done) {
    console.log(user);
    	const userExist=await newuserModel.getUsers({campo:'email',value:user?.email})
      done(null,userExist)
    
  });


  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, email, password, done) {
    const user=await newuserModel.getUsers({campo:'email',value:email})
       if (!user) {
         return done(null, false,)
       }
       if (!bcrypt.compareSync(password, user.password)) {
         return done(null, false,);
       }
      return done(null, user);
  }));
  passport.use('google-login',new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRECT,
    callbackURL: "p2-30703464.onrender.com/auth/google/contacts/contactos",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      let queryUser=await newuserModel.getUsers({campo:'googleId',value:profile?.id})
      if(!queryUser){
       queryUser=await newuserModel.getUsers({campo:'email',value:profile?.email})
      }
      if(queryUser && !queryUser?.googleId){
        let updateUser=await newuserModel.updateUser({
          campos:{googleId:profile?.id},
          filter:{email:queryUser.email}
      })
      console.log(updateUser);
      }
      if (!queryUser) {
        return done(null, false)
      }
      return done('', queryUser);

    } catch (error) {
      console.log(error);
      return done(null, false)

    }
  }
));
}


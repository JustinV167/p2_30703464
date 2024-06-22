const express=require("express")
const router= express.Router()
const passport=require("passport")
const usersController=require("../controllers/userController")
const newUserController=new usersController
router.get("/",(req,res)=>{
	res.render("index.ejs",{isLogin:req.isAuthenticated()})
})
router.post('/',newUserController.add,passport.authenticate('local-login', {
	successRedirect: '/contacts/contactos',
	failureRedirect: '/',
	failureFlash: true
  }))
module.exports= router
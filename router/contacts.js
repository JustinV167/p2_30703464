const express=require("express")
const router= express.Router()
const contactsController=require('../controllers/contactController')
const newContactsCtrl=new contactsController
router.get("/",async(req,res)=>{
	let data=await newContactsCtrl.readAll()
	//estableciendo vista para index
	res.render("contacts.ejs",{userData:data})

})
router.post("/addContact",newContactsCtrl.add)
router.get("/addContact",(req,res)=>{
	
	res.render("addContact.ejs",{captchaKey:process.env.KEY_CHAPTCHA_PUBLIC})
	
})

module.exports= router
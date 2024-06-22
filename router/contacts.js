const express=require("express")
const router= express.Router()
const contactsController=require('../controllers/contactController')
const protection=require("../utils/middlewareProtect")

const newContactsCtrl=new contactsController
router.get("/contactos",protection,async(req,res)=>{
	let data=await newContactsCtrl.readAll()
	//estableciendo vista para index
	res.render("contacts.ejs",{userData:data})

})
router.post("/addContact",newContactsCtrl.add)
router.get("/addContact",(req,res)=>{
	
	res.render("addContact.ejs")
	
})

module.exports= router
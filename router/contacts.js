const express=require("express")
const router= express.Router()
const contactsController=require('../controllers/contactController')
const newContactsCtrl=new contactsController
const geoip = require('geoip-lite');

router.get("/",async(req,res)=>{
	let data=await newContactsCtrl.readAll()
	const geo = geoip.lookup(req.ip)
	console.log(geo);
	//estableciendo vista para index
	res.render("contacts.ejs",{userData:data})

})
router.post("/addContact",newContactsCtrl.add)
router.get("/addContact",(req,res)=>{
	
	res.render("addContact.ejs")
	
})

module.exports= router
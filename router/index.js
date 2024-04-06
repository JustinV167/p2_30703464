const express=require("express")
const router= express.Router()

router.get("/",(req,res)=>{
	
	//estableciendo vista para index
	res.render("index.ejs")

})
module.exports= router
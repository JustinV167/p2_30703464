const express=require("express")
const router= express.Router()

router.get("/",(req,res)=>{
	
	//estableciendo vista para index
	res.render("curriculum.ejs")

})
module.exports= router
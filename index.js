const express= require("express")
const app=express()

const PORT=process.env.PORT ||3000 
app.use(express.static(__dirname+"/public"))
app.set("view engine","ejs")
app.set("views", __dirname +"/views")

//estableciendo las rutas de la pagina
app.use("/", require("./router/index"))
app.use((req,res)=>{
	res.status(404).render("error_404.ejs")
})


app.listen(PORT,()=>{
	console.log("El puerto a entrar es:", PORT)
})

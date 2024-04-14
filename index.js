//importando express
const express= require("express")
const app=express()
//estableciendo puerto, por env y si no existe, que se ejecute en el 3000
const PORT=process.env.PORT ||3000 
//estableciendo carpeta publica
app.use(express.static(__dirname+"/public"))
//estableciendo motor grafico
app.set("view engine","ejs")
//estableciendo carpeta de las vistas
app.set("views", __dirname +"/views")

//estableciendo las rutas de la pagina
app.use("/", require("./router/index")) 
//por si hay error
app.use((req,res)=>{
	res.status(404).render("error_404.ejs")
})

//iniciando servidor
app.listen(PORT,()=>{
	console.log("El puerto a entrar es:", PORT)
})

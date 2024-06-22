//importando express
const express= require("express")
const passport = require('passport');
const app=express()
const cookieParser=require("cookie-parser")
const session = require('express-session');
require('dotenv').config();
const PORT=process.env.PORT ||3000 
require('./passport/passport.js')(passport);                  

app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);
app.use(express.static(__dirname+"/public"))
app.set("view engine","ejs")
app.set("views", __dirname +"/views")

app.use(cookieParser("secret"))
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./router/index"))
app.use("/contacts", require("./router/contacts"))
app.use("/curriculum", require("./router/curriculum"))
app.use('/auth/google',require('./router/authGoogle.js'));
//por si hay error
app.use((req,res)=>{
	res.status(404).render("error_404.ejs")
})

//iniciando servidor
app.listen(PORT,()=>{
	console.log("El puerto a entrar es:", PORT)
})

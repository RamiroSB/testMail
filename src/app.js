const express = require('express')
const morgan = require('morgan')
const cors = require ('cors')
const bodyParse = require("body-parser")

const email = require("./email")

//instanciar e iniciar express
const app = express()

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`La app mailer esta corriendo en el puerto ${ PORT }`);
});


//MIDDLEWARES
app.use(morgan('dev')) //muestra mensajes por consola
app.use(cors()) 

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true})) //para recibir informacion desde el serv express

console.log('Database is connected') //para saber si esta conectado


//instancia de la clase importada, aplicada con parametros dotenv
const oEmail = new email({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dustin.simonis@ethereal.email',
        pass: 'dr37nRHRfk9rqDmgTK'
    }
})

app.use(express.urlencoded({extended: false}))

//Endpoint para el area de contacto

app.post ('/contact',function(req, res, next){
    let email = {
        from: "dustin.simonis@ethereal.email",
        to: "ramiro_salerno@solutionbox.com.ar",
        subject: "TESTING MAIL",
        html: `
        <div>
        <p><b style="color: green;">Message:</b> <br> ${req.body.mensaje}</p>
        </div>
        `
    }
    oEmail.enviarCorreo(email)
})
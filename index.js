const express=require('express');
var load=require('express-load');
var methodOverride = require('method-override')
var bodyParser=require('body-parser')
var pasta=require('path')
require('dotenv').config()
const port=process.env.PORT || 3000

    var app=express()
   // app.set('port',3000)
    app.use(express.static('./public'))
    
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(methodOverride())  

    app.set('view engine','ejs')
    app.set('views',pasta.join(__dirname,'/app/view'))

    load('model', {cwd:'app'})
    .then('controller')
    .then('routes')
    .into(app)

    
    app.listen(port,"0.0.0.0");

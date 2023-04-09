const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', require('./routes'))
app.listen(process.env.PORT||5000, ()=>{
    console.log(`App listening at port ${process.env.PORT||5000}`);
})
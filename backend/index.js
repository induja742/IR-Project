require('dotenv').config()
let express = require('express')
let connectToDb = require('./middlewares/dbConnection.js')
let cors = require('cors')


connectToDb();

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', require('./routes'))

app.listen(process.env.PORT||5000, ()=>{
    console.log(`App listening at port ${process.env.PORT||5000}`);
})
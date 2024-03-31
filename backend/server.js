require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')
const bodyParser = require('body-parser');

const app = express()

mongoose.connect(process.env.URI)
    .then(()=>{
        console.log('Listening to database & listening to port ', process.env.PORT)
    })
    .catch((error)=>{
        console.log('error conneting to the database ', error)
    })

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())//to use body of request(req.body())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'));

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/users', userRoutes)
app.use('/events', eventRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Listening on port', process.env.PORT)
})
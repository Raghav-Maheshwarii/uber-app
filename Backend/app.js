const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db') ;
const userRoute = require('./routes/user.routes')

connectToDB() ;

const app = express();

app.use(cors());
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;


app.use('/users',userRoute) ;


module.exports = app;

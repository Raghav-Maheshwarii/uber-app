const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectToDB = require('./db/db') ;
const userRoute = require('./routes/user.routes')

connectToDB() ;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;


app.use('/users',userRoute) ;


module.exports = app;

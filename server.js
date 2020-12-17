const express = require('express');
const path = require('path');
const dotenv = require('dotenv')

const connectDB = require('./config/db');


//Load env vars
dotenv.config({path: './config/config.env'});

connectDB();


const app = express();

//Body parser
app.use(express.json());


//Mount routers
//Example:
// app.use('/api/v1/users/register', users);
// app.use('/api/v1/users/login', users);
// app.use('/api/v1/users/profile', users);


const PORT = process.env.PORT;

const server = app.listen(PORT, ()=>{
    console.log(`App runing on port ${PORT}`)
});


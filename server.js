const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({path: './config/config.env'});

const connectDB = require('./config/db');

const cors = require('cors');

//Load environment variables
// dotenv.config({path: './config/config.env'});

connectDB();


const app = express();

app.use(cors())
//Body parser
app.use(express.json());


//Route files
const auth = require('./routes/auth');

//Mount routers

app.use('/api/v1/auth', auth);
// app.use('/api/v1/users/login', users);
// app.use('/api/v1/users/profile', users);


const PORT = process.env.PORT;

const server = app.listen(PORT, ()=>{
    console.log(`App runing on port ${PORT}`)
});


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');('join');
const fileUpload = require('express-fileUpload');

mongoose.connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Erro: ', err.message);
})

const server = express();
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileUpload());

server.use(express.static(path.join(__dirname, 'public')));

// server.use(routes);

server.listen(process.env.PORT, (err) => {console.log(`rodando: ${process.env.BASE}`)});
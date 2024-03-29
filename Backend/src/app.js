const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");

const { register } = require('./controllers/app.controller');

const app = express()

// Puerto
app.set('port', process.env.PORT || 3000);

// Seguridad
app.use(helmet());
app.use(cors({origin:'*'}));

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(require('./routes/app.routes'));


module.exports = app;
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

if ( process.env.NODE_ENV === "dev"){
    require('dotenv').config();
}

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
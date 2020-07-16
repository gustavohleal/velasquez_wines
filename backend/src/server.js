const express = require('express');
const routes = require('./routes');
const axios = require('axios')
const app = express();

app.use(express.json());

app.use(routes);




app.listen(3333);
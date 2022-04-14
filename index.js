const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api');
//express js framework - body-parser to help parse data

const app = express();
const port = process.env.PORT || 3000
//ensures we always connect to the right port, in case of failure defaults to localhost:3000
app.use(bodyParser.json());
app.use('/api/v1', api);

app.listen(port, () => 
console.log(`App listening on http://localhost:3000`));


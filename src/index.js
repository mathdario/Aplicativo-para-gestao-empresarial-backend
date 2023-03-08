require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});
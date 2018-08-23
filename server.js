const express = require('express');
const path = require('path');

const app = express();

app.listen(process.env.PORT || 8081, () => console.log('Listening'));
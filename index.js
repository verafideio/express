require('dotenv').config()

const { bootApp } = require('./src/app');

const port = process.env?.PORT || 8000;
bootApp(port);
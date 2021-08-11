const express = require('express');
const { connect } = require('@verafide/sdk');
const { createServer } = require('http');
const { verifySignature } = require('./verify-sig');
const session = require('express-session')

const app = express();
app.set('view engine', 'hbs');

const appKey = process.env.APP_KEY;
const appSecret = process.env.APP_SECRET;

var sess = {
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: {}
}
app.use(session(sess));
app.use(express.static('public'));
app.get('/', (req, res) => {
    const client = connect(process.env?.ENV || 'PRODUCTION');
    res.render('index.hbs', { appKey, hostname: client.getEnvironment().cwbackend, verified: req.session?.verified });
});
app.get('/verafideCallback', verifySignature(appKey, appSecret), async (req, res) => {
    if (!res.locals.signatureVerified) {
        return res.render('verify_failed.hbs', {});
    }
    console.log('req.session', req.session);
    const client = connect(process.env?.ENV || 'PRODUCTION');
    const present = await client.pollPresentation(req.query.token);

    if (present.state !== 5) {
        return res.render('verify_failed.hbs');
    }

    req.session.verified = true;
    res.render('verified.hbs', {});
});
app.get('/logout', (req, res) => {
    req.session.verified = false;

    res.redirect('/');
})

exports.bootApp = (port) => {
    console.log(`Listening on http://localhost:${port}`);
    createServer(app).listen(port);
}

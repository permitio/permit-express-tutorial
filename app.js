require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authentication = require('./middleware/authentication');
const authorization = require('./middleware/authorization');

app.use(bodyParser.json());

const mockPrivate = (req, res) => { res.json({ hello: 'Authenticated' }); };
const mockPublic = (req, res) => { res.json({ hello: 'public' }); };

app.get('/post', mockPublic);
app.get('/post/:id', mockPublic);
app.post('/post', authentication, authorization, mockPrivate);
app.put('/post/:id', authentication, authorization, mockPrivate);
app.delete('/post/:id', authentication, authorization, mockPrivate);

app.get('/author', mockPublic);
app.get('/author/:id', mockPublic);
app.post('/author', authentication, authorization, mockPrivate);
app.put('/author/:id', authentication, authorization, mockPrivate);
app.delete('/author/:id', authentication, authorization, mockPrivate);

app.get('/comment', mockPublic);
app.get('/comment/:id', mockPublic);
app.post('/comment', authentication, authorization, mockPrivate);
app.put('/comment/:id', authentication, authorization, mockPrivate);
app.delete('/comment/:id', authentication, authorization, mockPrivate);

module.exports = app;

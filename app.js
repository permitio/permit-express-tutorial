require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authentication = require('./middleware/authentication');

app.use(bodyParser.json());

const mockPrivate = (req, res) => { res.json({ hello: 'Authenticated' }); };
const mockPublic = (req, res) => { res.json({ hello: 'public' }); };

app.get('/post', mockPublic);
app.get('/post/:id', mockPublic);
app.post('/post', authentication, mockPrivate);
app.put('/post/:id', authentication, mockPrivate);
app.delete('/post/:id', authentication, mockPrivate);

app.get('/author', mockPublic);
app.get('/author/:id', mockPublic);
app.post('/author', authentication, mockPrivate);
app.put('/author/:id', authentication, mockPrivate);
app.delete('/author/:id', authentication, mockPrivate);

app.get('/comment', mockPublic);
app.get('/comment/:id', mockPublic);
app.post('/comment', authentication, mockPrivate);
app.put('/comment/:id', authentication, mockPrivate);
app.delete('/comment/:id', authentication, mockPrivate);

module.exports = app;

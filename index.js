const express = require('express');
const path = require('path');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { PORT } = process.env;

const app = express();

app.use(express.static(__dirname + '/web'))

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname + '/web/index/index.html'))
})

app.get('/login-callback', (_, res) => {
    res.sendFile(path.join(__dirname + '/web/login-callback/login-callback.html'))
})

const getSSOUser = (token) =>
    axios({
        url: 'https://api.sso.maxencemottard.com/api/users/me',
        method: 'GET',
        headers: { authorization: `Bearer ${token}` }
    })
        .then(result => result.data.data)

app.get('/me', [] ,(req, res) => {
    getSSOUser(req.headers.authorization)
        .then(user => res.status(200).json(user));
})

app.get('/data', (req, res) => {

})

app.listen(PORT, () => console.log(`SERVER_PORT: ${PORT}`));

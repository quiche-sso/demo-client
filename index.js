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

const data = [
    {
        "title": "Joker",
        "overview": "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
        "poster_path": "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        "backdrop_path": "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
        "release_date": "2019-10-02"
    },
    {
        "title": "Interstellar",
        "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "backdrop_path": "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
        "release_date": "2014-11-05"
    }
];

const middleware = async (req, res, next) => {
    const privateKey = 'priv_e27cef4a141a8201ed7914586646b183754947ee0e611433fe1dffea3037631e97bf8e893a4d08bb9f5384125340c30e8fc8';
    const url = 'https://api.sso.maxencemottard.com/api/token/verify';

    if (!req.headers.authorization) {
        res.status(401).send()
    }

    try {
        await axios({
            url, method: 'POST',
            data: { privateKey, token: req.headers.authorization }
        })

        next();
    } catch (e) {
        console.log(e)
        res.status(e.response.status).json(e.response.data.error)
    }
}

app.get('/data', [middleware], (req, res) => {
    res.json(data)
})

app.listen(PORT, () => console.log(`SERVER_PORT: ${PORT}`));

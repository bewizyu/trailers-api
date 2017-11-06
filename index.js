var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var log = require('log4js').getLogger('trailerWS');
var films = require('./film.json');

var app = express();

// PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('log4js').connectLogger(log));

// CORS
app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// ROUTER

app.get('/trailers', function (req, res){
    res.status(200).json(films);
});

/**
 * Pour les URL non définies
 */
app.use(function (req, res) {

    log.warn('URL not found : %s', req.originalUrl);

    res.status(404).send({
            message: 'URL not found'
        }
    );
});

var httpServer = http.createServer(app);
httpServer.listen(8080, function () {
    log.info('##########################################################');
    log.info('##### trailer WS started on port 8080 #####');
    log.info('##########################################################');

});
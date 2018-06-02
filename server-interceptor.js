/*jshint esversion: 6*/
const express = require('express');
const bodyParser = require('body-parser');
// import express from "express";
// import bodyParser from "body-parser";
const cors = require('cors');
const http = require('http');
const request = require('request');
const destinationURL = 'http://google.com:3100';
const app = express();
const port = 9000;
const timeStamp = Date(new Date());

app.listen(port, () => {
    console.log('server is listening at port: ', port, ' at :', timeStamp);
});

//CORS implementation
const corsOptions = {
    origin: 'http://localhost:4200/',
    optionSuccessStatus: 200//some legacy browsers IE11 choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.route('/redirection/Google').post((req, res) => {
    console.log(req.body, req.headers);

    let post_header = {
        "senderApplicationId": req.headers.senderApplicationId,
        "sessionId": req.headers.sessionId
    };

    let post_options = {
        url: destinationURL,
        method: 'POST',
        json: true,
        body: req.body,
        headers: post_header
    };

    request.post(post_options, function (error, response, body) {//using request node lib here
        if (!error && response.statusCode == 200) {
            res.json(body);
        }
        if (error) {
            throw error;
        }
    });

});

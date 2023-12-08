const express = require('express');
const cors  = require('cors');
const { movies, appEvents } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());



    const channel = await CreateChannel()

    
    customer(app, channel);
 
    
}

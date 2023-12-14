const express = require('express');
const cors  = require('cors');
const { movies, appEvents } = require('./api');
const { CreateChannel} = require('./utils')

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());

      //api
  appEvents(app);


    const channel = await CreateChannel()

    
    movies(app, channel);
 
    
}




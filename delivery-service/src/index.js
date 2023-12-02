require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3008, () => {
    console.log(`Watchlist Services running on port ${3008}`)
})
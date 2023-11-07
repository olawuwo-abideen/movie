require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3003, () => {
    console.log(`Movie Server running on port ${3003}`)
})
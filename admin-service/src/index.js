require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3001, () => {
    console.log(`Admin Server running on port ${3001}`)
})
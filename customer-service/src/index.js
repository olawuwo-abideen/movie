require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3002, () => {
    console.log(`User Services running on port ${3002}`)
})
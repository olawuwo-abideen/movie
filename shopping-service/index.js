require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3004, () => {
    console.log(`Shopping Services running on port ${3004}`)
})
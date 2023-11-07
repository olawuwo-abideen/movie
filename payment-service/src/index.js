require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3005, () => {
    console.log(`Payment Services running on port ${3005}`)
})
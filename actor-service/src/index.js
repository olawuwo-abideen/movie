require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3004, () => {
    console.log(`Actor Services running on port ${3004}`)
})
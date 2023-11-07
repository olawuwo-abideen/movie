require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3007, () => {
    console.log(`Actor Server running on port ${3007}`)
})
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.listen(3006, () => {
    console.log(`Recommendation Server running on port ${3006}`)
})
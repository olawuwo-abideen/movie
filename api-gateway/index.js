const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/admin', proxy('http://localhost:3001'))
app.use('/customer', proxy('http://localhost:3002'))
app.use('/movie', proxy('http://localhost:3003'))
app.use('/shopping', proxy('http://localhost:3004'))
app.use('/payment', proxy('http://localhost:3005'))
app.use('/notification', proxy('http://localhost:3006'))
app.use('/delivery', proxy('http://localhost:3007'))

app.listen(3000, () => {
    console.log('Gateway is Listening on Port 3000')
})

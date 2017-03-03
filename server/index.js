const express = require('express');
const app = express();
const path = require('path');
const renderer = require('./renderer');

app.use('/', express.static(path.join(__dirname, '../build')));
// app.get('/', (req, res)=>{
//     res.send('hello world');
// });

app.get('*', renderer);

app.listen(8080, ()=>{
    console.log('Listening on port 8080');
})
const express = require('express');
const app = express();
const path = require('path');
const renderer = require('./renderer');

app.get('/', renderer); // without this code, index page won't be server-rendered
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', renderer);

app.listen(8080, ()=>{
    console.log('Listening on port 8080');
})
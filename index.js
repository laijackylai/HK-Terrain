const express = require('express');
const path = require('path');
const app = express();
const expressStaticGzip = require('express-static-gzip');

app.use(expressStaticGzip(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => console.log('app running at http://localhost:3000'));

const express = require('express');
const path = require('path');

const app = express();

const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

app.use(express.static(path.join(__dirname, 'dist/fedex-coding-challenge')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/fedex-coding-challenge/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('app listening on port ' + port);
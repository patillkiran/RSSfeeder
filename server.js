const httpClient = require('request');
const jsforce = require('jsforce');

const session = require('express-session');

const bodyParser = require('body-parser');
const util = require('util');
var nocache = require('nocache');

const express = require('express');
const app = express();
// Import routes
var path = require('path');
app.use(express.static(path.resolve('./public/')));   // <-- or whatever you do to include your API endpoints and middleware
//const r = require('./routes.js')
//app.use(r);
//to avoid caching
app.use(nocache());
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
require("babel-core").transform("code", {
	plugins: ["transform-react-jsx"]
});

app.use(webpackDevMiddleware(compiler, {
publicPath: config.output.publicPath
})); 

app.get('/index', function(req, res) {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
   res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
   res.setHeader("Expires", "0"); // Proxies.
	res.sendFile(__dirname + '/views/index.html');
});

//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var loginUrl;
var clientId;
var clientSecret;

//jsForce connection


// Serve static assets
/*app.use(express.static(path.join(__dirname, '../build')));*/

app.set('port', 8090);
app.listen(app.get('port'), function() {
    console.log('Node App Started');
});

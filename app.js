'use strict';

/*
 * Express Dependencies
 */
var express     = require('express'),
    exphbs      = require('express-handlebars'),
    compression = require('compression'),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    log         = require('log4js').getLogger();

var app  = express(),
    port = process.env.PORT || 3000;

// gzip compression
app.use(compression());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine config
var appDir = process.env.NODE_ENV === 'production'? 'dist/app': 'app';

app.engine('handlebars', exphbs({
    defaultLayout: 'admin',
    layoutsDir: path.join(appDir, 'views/layouts'),
    partialsDir: path.join(appDir, 'views/partials')
}));

// Locate the views
app.set('views', path.join(appDir, 'views'));

// Locate the assets
app.use(express.static(path.join('.', appDir)));
app.use('/users',    express.static(path.join('.', appDir)));
app.use('/retention', express.static(path.join('.', appDir)));
app.use('/engage',    express.static(path.join('.', appDir)));
app.use('/features',  express.static(path.join('.', appDir)));
app.use('/devices',   express.static(path.join('.', appDir)));

// Set Handlebars
app.set('view engine', 'handlebars');

// Index Page
app.get('/', function(request, response) {
    response.render('index');
});

// API routes
app.use('/api', require('./routes/api'));

// Not implemented pages
app.get('*', function(request, response) {
    response.render('blank');
});

// start server
app.listen(port);
log.info('Express started on port ' + port);
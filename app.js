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
var assetsDir = process.env.NODE_ENV === 'production'? 'dist/assets': 'assets',
    viewsDir  = process.env.NODE_ENV === 'production'? 'dist/views': 'views';

app.engine('handlebars', exphbs({
    defaultLayout: 'admin',
    layoutsDir: path.join(viewsDir, 'layouts'),
    partialsDir: path.join(viewsDir, 'partials')
}));

// Locate the views
app.set('views', path.join('.', viewsDir));

// Locate the assets
app.use(express.static(path.join('.', assetsDir)));

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
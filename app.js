'use strict';

/*
 * Express Dependencies
 */
var express     = require('express'),
    exphbs      = require('express-handlebars'),
    compression = require('compression'),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    apiRoutes   = require('./routes/api');

var app = express(),
    port = 3000;

// gzip compression
app.use(compression());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine config
var assetsDir = process.env.NODE_ENV === 'production'? 'dist/assets': 'assets',
    viewsDir = process.env.NODE_ENV === 'production'? 'dist/views': 'views';

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
app.use('/api', apiRoutes);

app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
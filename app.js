'use strict';

/*
 * Express Dependencies
 */
var express     = require('express'),
    exphbs      = require('express-handlebars'),
    compression = require('compression'),
    bodyParser  = require('body-parser'),
    apiRoutes   = require('./routes/api');

var app = express(),
    port = 3000;

// gzip compression
app.use(compression());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');

    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');

    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

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
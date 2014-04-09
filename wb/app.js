/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var app = express();

var SerialConnection = require('./lib/service');
var Commands = require('./lib/commands');

var serv = new SerialConnection();
var cmd = new Commands(serv);

cmd.allOff();
cmd.allOn();
cmd.oneOff(2);
cmd.oneOff(3);
cmd.oneAllOn(5, 255, 255, 255);

/**
 * Routes
 */
var service = require('./routes/service');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express)

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/service', service.go);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

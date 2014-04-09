/*
 * POST service functions.
 */
 
var SerialConnection = require('../lib/service');
var Commands = require('../lib/commands');

var serv = new SerialConnection();
var cmd = new Commands(serv);

exports.go = function(req, res) {
  console.log(req.body.cmd);
  res.send("ok");
  execCommand = 'cmd.' + req.body.cmd;
  console.log(execCommand);
  eval(execCommand);
};

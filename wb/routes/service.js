/*
 * POST service functions.
 */
 
var SerialConnection = require('../lib/service');
var Commands = require('../lib/commands');

var serv = new SerialConnection();
var cmd = new Commands(serv);

exports.go = function(req, res) {
  ok = true;
  if (req.body.cmd !== undefined && req.body.cmd !== '') {
    if (req.body.cmd[0] !== '/') {
      execCommand = 'cmd.' + req.body.cmd;
      console.log('running command: ' + execCommand);
      eval(execCommand);
      message = 'broadcasted ' + req.body.cmd;
    } else {
      message = 'comment detected: ' + req.body.cmd;
    }
  } else {
    message = 'empty command';
    ok = false;
  }
  
  res.send({ok: ok, msg: message});
};

var SerialPort = require("serialport").SerialPort
var events = require('events');
var eventEmitter = new events.EventEmitter();

function serialConnection() {
  var CONNECTION_PORT = "/dev/tty.usbmodem1421"
  var portFound = false;
  var serialPort;
  
  this.init = function(){
    initPorts = function(){
      var s = require("serialport");
      s.list(function (err, ports) {
        ports.forEach(function(port) {
          if (port.comName.replace("cu","") == CONNECTION_PORT.replace("tty","")){
            console.log('port verified, serialHelloConnect');
            eventEmitter.emit('serialHelloConnect');
            portFound = true;
          }
        });
        if (!portFound){
          console.log('port not found - defaulting to debug mode');
        }
      });
    }
    
    serialHelloConnect = function(){
      serialPort = new SerialPort(CONNECTION_PORT, {
        baudrate: 9600
      });
      serialPort.on('open', function (err) {
        console.log('serial connection established...');
        /*
        serialPort.write('00000', function(err, results) {
          console.log('sending hello world byte...');
          if (err != undefined){
            console.log(err);
          }
        });
        */
      }); 
    }
    
    eventEmitter.on('serialHelloConnect', serialHelloConnect);
    initPorts();
  }
  
  this.serialwrite = function(data, tryHard){
    if (portFound){
      //console.log(serialPort);
      console.log(data);
      if (tryHard == false) {
          serialPort.write(data, function(err, results) {
            if (err != undefined){
              console.log(err);
            }
          }); 
      } else {
        for (i = 0; i < 5; i ++) {
          serialPort.write(data, function(err, results) {
            if (err != undefined){
              console.log(err);
            }
          });
        }
      }
    } else {
      console.log(data);
    }
  }
  
  this.init();
}

module.exports = serialConnection;
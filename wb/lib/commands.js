function commands(service) {
  this.characters = false;
  
  var animateQueue = [];
  var s = service;
  
  function animate() {
    // Send the Flicker Animation
    if (animateQueue.indexOf('flicker') != -1) {
      if (Math.random() > 0.5) { 
        packet = [0xAA, 0xFF, 255, 255, 255];
      } else {
        packet = [0xAA, 0xFF, 0, 0, 0];
      }
      s.serialwrite(packet);
    }
  }
  
  this.t = setInterval(animate, 83); // roughly 12fps
  
  this.allOff = function() {
    packet = [0xAA, 0xFF, 0, 0, 0];
    s.serialwrite(packetToReturn(packet));
  }

  this.allOn = function(r, g, b) {
    packet = [0xAA, 0xFF, r, g, b];
    //s.serialwrite(packetToReturn(packet));
  }

  this.oneOff = function(light) {
    packet = [0xAA, light, 0, 0, 0];
    s.serialwrite(packetToReturn(packet));
  }

  this.oneOn = function(light, r, g, b) {
    packet = [0xAA, light, r, g, b];
    s.serialwrite(packet);
  }

  this.flicker = function() {
    animateQueue.push('flicker');
  }
  
  this.kill = function() {
    animateQueue = [];
  }
  
  packetToReturn = function(packet) {
    if (this.characters) {
      return packetToCharArray(packet);
    } else {
      return packetToBytes(packet);
    }
  }

  packetToBytes = function(packet) {
    bytes = 0;
    for (k in packet) {
      bytes = bytes | packet[k];
      bytes = bytes << 8;
    }
    return bytes;
  }

  // no longer used
  packetToCharArray = function(packet) {
    characters = "";
    for (k in packet) {
      characters += String.fromCharCode(packet[k]);
    }
  }
}

module.exports = commands;
function commands(service) {
  this.s = service;
  this.characters = false;

  this.allOff = function() {
    packet = [0xAA, 0xFF, 0, 0, 0];
    this.s.serialwrite(packetToReturn(packet));
  }

  this.allOn = function(r, g, b) {
    packet = [0xAA, 0xFF, r, g, b];
    //this.s.serialwrite(packetToReturn(packet));
  }

  this.oneOff = function(light) {
    packet = [0xAA, light, 0, 0, 0];
    this.s.serialwrite(packetToReturn(packet));
  }

  this.oneOn = function(light, r, g, b) {
    packet = [0xAA, light, r, g, b];
    this.s.serialwrite(packet);
  }

  this.oneOn = function(light, r, g, b) {
    packet = [0xAA, light, r, g, b];
    this.s.serialwrite(packet);
  }
  
  this.flicker = function() {
    console.log('flicker!');
    for (i = 0; i < 10; i ++) {
      console.log(i);
      //packet = [0xAA, 2, i, i, i];
      //this.s.serialwrite(packet);
    }
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

  packetToCharArray = function(packet) {
    characters = "";
    for (k in packet) {
      characters += String.fromCharCode(packet[k]);
    }
  }
}

module.exports = commands;
function commands(service) {
  this.s = service;
  this.characters = false;

  this.allOff = function() {
    packet = [0xAA, 0x82, 0, 0, 0]
    console.log(packet);
    this.s.serialwrite(packetToReturn(packet));
  }

  this.allOn = function(r, g, b) {
    packet = [0xAA, 0x82, r, g, b];
    console.log(packet);
    this.s.serialwrite(packetToReturn(packet));
  }

  this.oneOff = function(light) {
    packet = [0xAA, (light << 4) || 0x2, 0, 0, 0];
    console.log(packet);
    this.s.serialwrite(packetToReturn(packet));
  }

  this.oneAllOn = function(light, r, g, b) {
    packet = [0xAA, (light << 4) || 2, r, g, b];
    console.log(packet);
    this.s.serialwrite(packetToReturn(packet));
  }

  // Row is either 0 or 1
  this.oneSingleRowOn = function(light, row, r, g, b) {
    packet = [0xAA, (light << 4) || row, r, g, b]
    console.log(packet);
    this.s.serialwrite(packetToReturn(packet));
  }

  this.oneSingleRowOff = function(light, row) {
    packet = [0xAA, (light << 4) || row, 0, 0, 0]
    console.log(packet);
    this.s.serialwrite(packetToReturn(packet));
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
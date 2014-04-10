function commands(service) {
  this.characters = false;
  
  var animateQueue = [];
  var s = service;
  
  function animate() {
    for (i in animateQueue) {
      animation = animateQueue[i];
      cmd = animation.split(' ')[0];
      
      // Send the Flicker Animation
      if (cmd === 'flicker') {
        if (Math.random() > 0.5) { 
          packet = [0xAA, animation.split(' ')[1], 255, 255, 255];
        } else {
          packet = [0xAA, animation.split(' ')[1], 200, 200, 200];
        }
        s.serialwrite(packet, false);
      }
      
      // Send the Fade Animation
      if (cmd === 'fade') {
        v = animation.split(' ');
        light = parseInt(v[1]);
        steps = parseInt(v[8]) - 1;
        sr = parseInt(v[2]);
        sg = parseInt(v[3]);
        sb = parseInt(v[4]);
        er = parseInt(v[5]);
        eg = parseInt(v[6]);
        eb = parseInt(v[7]);
        packet = [0xAA, light, Math.round(v[2]), Math.round(v[3]), Math.round(v[4])];
        newsr = sr + (er - sr)/(steps);
        newsg = sg + (eg - sg)/(steps);
        newsb = sb + (eb - sb)/(steps);
        newcmd = ['fade', light, newsr, newsg, newsb, er, eg, eb, steps];
        animateQueue[i] = newcmd.join(' ');
        
        if (steps == 0) {
          animateQueue.splice(i, 1);
        }
        
        s.serialwrite(packet, false);
      }
    }
  }
  
  this.t = setInterval(animate, 83); // roughly 12fps
  
  this.setAlloff = function() {
    packet = [0xAA, 0xFF, 0, 0, 0];
    s.serialwrite(packetToReturn(packet));
  }

  this.setAll = function(r, g, b) {
    packet = [0xAA, 0xFF, r, g, b];
    //s.serialwrite(packetToReturn(packet));
  }

  this.setOneOff = function(light) {
    packet = [0xAA, light, 0, 0, 0];
    s.serialwrite(packet);
  }

  this.setOne = function(light, r, g, b) {
    packet = [0xAA, light, r, g, b];
    s.serialwrite(packet);
  }
  
  this.setMany = function(lightArray, r, g, b) {
    for (i in lightArray) {
      light = lightArray[i];
      packet = [0xAA, light, r, g, b];
      s.serialwrite(packet);
    }
  }
  
  this.fadeOne = function(light, sr, sg, sb, er, eg, eb, steps) {
    params = ['fade', light, sr, sg, sb, er, eg, eb, steps]
    animateQueue.push(params.join(' '));
  }
  
  this.fadeMany = function(lights, sr, sg, sb, er, eg, eb, steps) {
    for (i in lights) {
      light = lights[i];
      params = ['fade', light, sr, sg, sb, er, eg, eb, steps]
      animateQueue.push(params.join(' ')); // JOIN BY space
    }
  }
  
  this.flicker = function(light) {
    animateQueue.push('flicker ' + light);
  }
  
  this.kill = function() {
    animateQueue = [];
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
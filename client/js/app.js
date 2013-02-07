$(function() {

var keys = {
  72  : {
    'video': 'http://www.youtube.com/watch?v=oHg5SJYRHA0',
    'time': 4
  },
  74  : {
    'video': 'http://www.youtube.com/watch?v=yBwD4iYcWC4',
    'time': 82
  }
}

for (var key in keys) {
  keys[key].popcorn = new Popcorn.youtube('#video', keys[key].video)
};


var socket = io.connect('http://localhost:8000');

socket.on('message', function (data) {
  console.log(data)
  if (keys[data.key]) {
    keys[data.key].popcorn.currentTime(keys[data.key].time)
    keys[data.key].popcorn.play();
    if (data.vol > 0) {
      keys[data.key].popcorn.unmute();
      keys[data.key].popcorn.play()
    } else {
      keys[data.key].popcorn.mute();
      keys[data.key].popcorn.pause();
    }
  }
});




})
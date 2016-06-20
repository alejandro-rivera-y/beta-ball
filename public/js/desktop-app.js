'use strict';

/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

socket.on('identification', function (data) {
  desktop = true;
  contenido.innerHTML = data.url;
});

socket.on('joined', function (userJoined) {
  if (desktop) {
    betaBalls[userJoined.id] = new BetaBall(userJoined);
  }
});

socket.on('basicOptions', function (data) {
  if (desktop) {
    betaBalls[data.id].name = data.name;
    betaBalls[data.id].color = data.color;
  }
});

socket.on('notification', function (data) {
  if (data.desktop && desktop) {
    renderNotification(data);
  }
});

socket.on('start', function (users) {
  if (desktop) {
    var count = 3;
    contenido.classList.add('hidden');
    timerContainer.style.opacity = '1';
    conteoRegresivo(count);
    setTimeout(start, 4500);
  }
});

socket.on('moved', function (userMoved) {
  if (desktop) {
    map.betaBalls[userMoved].strength = map.betaBalls[userMoved].strength + 1 || 0;
  }
});

socket.on('screen winner', function (winner) {
  if (desktop) {
    winnerWindow(winner);
    ballContainer.classList.add('hidden');
    betaBalls = {};
    map = {};
  }
});

socket.on('user left', function (user) {
  if (desktop) {
    delete betaBalls[user];
  }
});

function start() {
  ballContainer.classList.remove('hidden');
  map = new Enviroment({
    canvas: canvas,
    friction: 0.06,
    betaBalls: betaBalls
  });
  map.draw(function (winner) {
    socket.emit('winner', winner);
  });
}

function conteoRegresivo(count) {
  var timer = setInterval(function () {
    timerContainer.innerHTML = count;
    if (count === 0) {
      timerContainer.style.opacity = '0';
      clearInterval(timer);
    }
    count--;
  }, 1000);
}

//# sourceMappingURL=desktop-app.js.map
'use strict';

/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

optionsPicker.addEventListener('submit', sendBasicOptions);

socket.on('joined', function (userJoined) {
  if (mobile && !user.id) {
    user = userJoined;
    renderColors();
    fillBasicOptions();
  }
});

socket.on('basicOptions', function (data) {
  if (data.id === user.id) {
    colors[data.color].disabled = true;
    renderColors();
    readyContainer();
  }
});

socket.on('notification', function (data) {
  if (data.id === user.id) {
    renderNotification(data);
  } else if (data.all) {
    renderNotification(data);
  }
});

socket.on('start', function (users) {
  if (mobile) {
    optionsPicker.classList.add('hidden');
    readyWindow.classList.add('hidden');
    move.classList.remove('hidden');
    eventListenerOnBetaBalls();
  }
});

socket.on('screen winner', function (winner) {
  if (mobile && winner.id !== user.id) {
    looserWindow();
  } else if (mobile) {
    winnerWindow(winner);
  }
});

function sendBasicOptions(event) {
  event.preventDefault();
  betaBall.name = this.elements.name.value;
  betaBall.color = this.elements.color.value;
  if (betaBall.name && betaBall.color) {
    socket.emit('newOptions', betaBall);
  } else {
    alert('El nombre y el color son obligatorios');
  }
}

function renderColors(htmlElement) {
  // TODO Verificar que el color no se repita
  colorContainer.innerHTML = '';
  for (var index in colors) {
    colorContainer.innerHTML += '\n<label class="color-picker ' + (colors[index].disabled && betaBall.color !== colors[index] ? 'disabled' : '') + '" style="background-color: ' + index + '">\n    <input type="radio" \n        ' + (colors[index].disabled && betaBall.color !== colors[index] ? 'disabled' : '') + ' \n        ' + (betaBall.color === colors[index] ? 'checked' : '') + ' \n      name="color" value="' + index + '">\n</label>';
  }
}

function eventListenerOnBetaBalls() {
  var internalCounter = 0;
  var READY_ON_TOP = false;
  var READY_ON_BOTTOM = true;
  var END_MOVE = 90; // De un angulo de 90 grados ha alcanzado el maximo
  var BEGIN_MOVE = 0; // Comienzo del movimiento de 90 grados

  renderMeeter(meeter);

  function handleOrientation(event) {
    var beta = event.beta;
    if (beta > END_MOVE && READY_ON_BOTTOM) {
      READY_ON_TOP = true;
      READY_ON_BOTTOM = false;
    }
    if (beta < BEGIN_MOVE && READY_ON_TOP) {
      READY_ON_TOP = false;
      READY_ON_BOTTOM = true;
      internalCounter++;
      socket.emit('user move', true);
      window.navigator.vibrate([100, 30]);
    }
  }

  window.addEventListener('deviceorientation', handleOrientation);

  move.addEventListener('click', function () {
    socket.emit('user move', true);
  });
}

function fillBasicOptions() {
  // TODO Buscar en las cookies
  // TODO Llenar toda la información
  // TODO almacenarlo en cookies
  optionsPicker.classList.remove('hidden');
  contenido.classList.add('hidden');
}

function readyContainer() {
  readyWindow.classList.remove('hidden');
}

function renderMeeter() {
  // TODO renderizar el medidor de velocidad
}

//# sourceMappingURL=mobile-app.js.map
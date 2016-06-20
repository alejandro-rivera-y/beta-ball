/**
 * Created by alejandro on 16/06/16.
 */

var socket = io();
var desktop = false;
var mobile = false;
var betaBalls = {};
var betaBall = {};
var colors = {'#02EB8A': {}, '#59FFF0': {}, '#106B63': {}, '#B85A2E': {}, '#6B2605': {}};
var map = {};
var user = {};
var sessionToken = document.querySelector('head').attributes['data-socket-connection'].value;
var readyButton = document.querySelector('#ready');
var mensaje = document.querySelector('#mensaje');
var contenido = document.querySelector('#contenido');
var contenidoDos = document.querySelector('#contenidoDos');
var notificacion = document.querySelector('#notificaciones');
var ballContainer = document.querySelector('#beta-ball-container');
var move = document.querySelector('#move');
var newGamebuttons = document.querySelectorAll('.new-game');
var winnerName = document.querySelector('#winner-name');
var body = document.querySelector('body');
var winnerContainer = document.querySelector('#winner');
var looserContainer = document.querySelector('#looser');
var meeter = document.querySelector('#meeter');
var optionsPicker = document.querySelector('#options-picker');
var colorContainer = document.querySelector('#color-picker');
var readyWindow = document.querySelector('#ready-window');
var canvas = document.querySelector('#beta-ball');
var timerContainer = document.querySelector('#timer');


newGamebuttons
  .forEach(item => item.addEventListener('click', restart));

readyButton
  .addEventListener('click', () => {
    socket.emit('user ready', true)
  });

if (sessionToken) {
  mobile = true;
  socket.emit('join', sessionToken)
}

socket.on('winner', user => {
  // TODO seleccionar el ganador
});

socket.on('finished', data => {
  printTimeOnDevice()
});

socket.on('user times', times => {
  printTimeOnDesktop()
});

socket.on('display error', ()=> {
  // TODO mostrar los errores en un recuadro
});

function printTimeOnDesktop() {
  // TODO imprimir los tiempos en el desktop
}

function looserWindow() {
  looserContainer.classList.add('block')
}

function winnerWindow(winner) {
  winnerContainer.classList.add('block');
  winnerName.innerHTML = winner.name;
  body.style.backgroundColor = winner.color;
  ballContainer.classList.add('hidden')
}

function restart() {
  location.reload()
}

function errorHandler(err) {
  socket.emit('error', err)
}

function renderNotification(data) {
  notificacion.classList.add(data.type);
  notificacion.innerHTML = data.message
}
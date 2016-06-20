/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict"

import express from 'express'
import handlebars from 'express-handlebars'

let application = express()

application.use(express.static('public'))
application.engine('handlebars', handlebars());
application.set('view engine', 'handlebars');

application.get('/', (req, res) => {
  res.render('index')
})

application.param('id', (request, response, next, session) => {
  request.sessionSocket = session
  next()
})

application.get('/session/:id', (request, response, next) => {
  response.render('index', {sessionSocket: request.sessionSocket})
})

module.exports = application
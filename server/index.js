/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

var env = require('../config/' + (process.env.ENV || 'develop') + '.json')
process.env.PORT = env.port
process.env.HOST = env.host

import socket from './src/socket'

const PORT = process.env.PORT || 3000

socket.listen(PORT, () => {
  console.log(`Listen on ${PORT}`)
})
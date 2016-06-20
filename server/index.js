/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */


import socket from './src/socket'

const PORT = process.env.ENV || 3000

socket.listen(PORT, () => {
  console.log(`Listen on ${PORT}`)
})
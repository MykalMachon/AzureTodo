#!/usr/bin/env node

import 'dotenv/config';
import app from './app.js';
import http from 'http';

/** 
 * set the port  
 */

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/** 
 * create the server 
 */

const server = http.createServer(app);

/** 
 * listen on provided port, on all network interfaces 
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
* Event listener for HTTP server "error" event.
*/

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// Workaround from https://stackoverflow.com/a/72416352/599991
import { setDefaultResultOrder } from 'node:dns'
setDefaultResultOrder('ipv4first');
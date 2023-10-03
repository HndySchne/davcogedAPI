// import de la méthode http
const http = require('http');

// création de la constante app qui va permettre d'utiliser le fichier app.js 
const app = require('./app.js');

// renvoie un port avlide sous forme de chaine caract/string 
const normalizePort = val => {
  const port = parseInt(val, 10);

  // si c'est nul 
  if (isNaN(port)) {
    return val;
  }
//   si c'est > ou égale à 0
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// gestion des erreurs 
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      // console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// On utilise donc le fichier app pour créer le server sur le port 3000
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  // console.log('Listening on ' + bind);
});

server.listen(port);

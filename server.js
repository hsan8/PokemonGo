const http = require('http');
const app = require('./app');
const serverError = require('./src/helpers/errorsHandler/serverError');
// Use the custom error handler middleware

const server = http.createServer(app);

// Set the server timeout based on an environment variable
// server.timeout = Number(process.env.POKEMON_GO_API_TIMEOUT);

// Start the server on the specified port and log the port
server.listen(global.port, () => {
  console.log('Server running on', global.port);
});

// Add an event listener for uncaught exceptions and pass them to the custom error handler
process.on('uncaughtException', (err) => {
  serverError(err);
});

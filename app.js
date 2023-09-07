const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errorHandlerMiddleware } = require('./src/helpers/middleware/errorHandler.middleware');
const { ErrorException } = require('./src/helpers/errorsHandler/ErrorException');
const routes = require('./src/helpers/routes');

const app = express();
dotenv.config();

// Use Helmet middleware to set security-related HTTP headers
app.use(helmet());

// Configure CORS settings, allowing credentials and specifying the origin
app.use(cors({ credentials: true, origin: process.env.POKEMON_GO_FRONT_END_BASE_URL }));

// For parsing application/json with a limit for the size of JSON requests
app.use(bodyParser.json({ limit: '50mb' }));

// For parsing application/x-www-form-urlencoded with a limit and extended support
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Disable the "x-powered-by" header in HTTP responses
app.disable('x-powered-by');

// Parse JSON and URL-encoded request bodies with extended content support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route for the root path ("/") that sends a response to check the server is live
app.get('/', (req, res) => {
  res.send(`This is PokemonGo Server. Version:  ${global.buildVersion}`);
});

// Import various modules and configure the application
require('./src/helpers/constant');
require('./src/helpers/utility');

// APIs start point
app.use('/api', routes);

const server = http.createServer(app);

// Set the server timeout based on an environment variable
server.timeout = Number(process.env.POKEMON_GO_API_TIMEOUT);

// Use the custom error handler middleware
app.use(errorHandlerMiddleware);

// Start the server on the specified port and log the port
server.listen(global.port, () => {
  console.log('Server running on', global.port);
});

// Add an event listener for uncaught exceptions and pass them to the custom error handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  new ErrorException(err);
});

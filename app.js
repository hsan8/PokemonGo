// Import the Express.js library
const express = require('express');

// Import the CORS middleware
const cors = require('cors');

// Import the dotenv library for managing environment variables
const dotenv = require('dotenv');

// Import the built-in HTTP module
const http = require('http');

// Import the body-parser middleware for parsing request bodies
const bodyParser = require('body-parser');

/**
 * Helmet can help protect the app from some well-known
 * web vulnerabilities by setting HTTP headers appropriately.
 * Helmet is a collection of several smaller middleware functions
 * that set security-related HTTP response headers.
 */
const helmet = require('helmet');

// Create an Express application instance
const app = express();

// Load environment variables from a .env file into process.env
dotenv.config();

// Use Helmet middleware to set security-related HTTP headers
app.use(helmet());

// Disable the "x-powered-by" header in HTTP responses
app.disable('x-powered-by');

// Import a custom error handler middleware
const { errorHandlerMiddleware } = require('./src/helpers/middleware/errorHandler.middleware');

// Import a custom error class
const { ErrorException } = require('./src/helpers/errorsHandler/ErrorException');

/**
 * For parsing application/json
 * Set a limit for the size of JSON requests to 50mb
 */
app.use(bodyParser.json({ limit: '50mb' }));

/**
 * For parsing application/x-www-form-urlencoded
 * Set a limit for the size of URL-encoded requests to 50mb
 * Enable parsing of extended URL-encoded content
 */
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configure CORS settings, allowing credentials and specifying the origin
app.use(cors({ credentials: true, origin: process.env.POKEMON_GO_FRONT_END_BASE_URL }));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies with extended content support
app.use(express.urlencoded({ extended: true }));

// Define a route for the root path ("/") that sends a response to check the server is live
app.get('/', (req, res) => {
  res.send(`This is PokemonGo Server. Version:  ${global.buildVersion}`);
});

// Add an event listener for uncaught exceptions and pass them to the custom error handler
process.on('uncaughtException', (err) => {
  new ErrorException(err);
});

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Import various modules and configure the application
require('./src/helpers/routes')(express, app);
require('./src/helpers/constant');
require('./src/helpers/utility');

// Use the custom error handler middleware
app.use(errorHandlerMiddleware);

// Start the server on the specified port
server.listen(global.port);

// Set the server timeout based on an environment variable
server.timeout = Number(process.env.POKEMON_GO_API_TIMEOUT);

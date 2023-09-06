global.port = process.env.POKEMON_GO_SERVER_PORT || 3000;
global.buildVersion = '1.0.0';
global.serverStartTime = new Date();
global.apiVersion = process.env.POKEMON_GO_API_VERSION || 'v1';
global.environment = process.env.POKEMON_GO_ENVIRONNEMENT || 'DEV';
global.limit = 10;

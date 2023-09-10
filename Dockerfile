FROM node:18
WORKDIR /usr/src/v1.00/
RUN mkdir /usr/src/app
WORKDIR /app
COPY package.json .
COPY . .

# Expose port 8080 for incoming traffic
EXPOSE 8080

# Set environment variables
#general config
ENV POKEMON_GO_SERVER_PORT=8080

# POKEMON_GO_ENVIRONNEMENT=PROD
ENV POKEMON_GO_ENVIRONNEMENT=PROD
ENV POKEMON_GO_API_TIMEOUT=10000
ENV POKEMON_GO_FRONT_END_BASE_URL=localhost

#mongodb config
ENV POKEMON_GO_MONGO_USER_NAME=user
ENV POKEMON_GO_MONGO_PASSWORD=password2022
ENV POKEMON_GO_MONGO_URI=cluster0.poohc.mongodb.net/POKEMON_GO
# Start Node.js app
CMD ["npm", "start"]
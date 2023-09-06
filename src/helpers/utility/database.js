const mongoose = require('mongoose');

mongoose.set('runValidators', true);
const mongodbConnectionUri = `mongodb+srv://${process.env.POKEMON_GO_MONGO_USER_NAME}:${process.env.POKEMON_GO_MONGO_PASSWORD}@${process.env.POKEMON_GO_MONGO_URI}?retryWrites=true&w=majority`;

mongoose
  .connect(mongodbConnectionUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true
  })
  .then((result) => {
    if (result) console.log(`Mongoose connected successfully ++ ${process.env.POKEMON_GO_MONGO_URI}`);
    else console.log('Mongoose connection failed');
  })
  .catch((e) => {
    console.log('Mongoose connection failed');
    console.log(e);
  });

const conn = mongoose.connection;
module.exports = conn;

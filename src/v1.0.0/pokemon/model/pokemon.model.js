const mongoose = require('mongoose');

// Define a Mongoose Schema
const pokemonSchema = new mongoose.Schema({
  Row: { type: Number },
  Name: { type: String },
  PokedexNumber: { type: Number },
  ImgName: { type: String },
  Generation: { type: Number },
  EvolutionStage: { type: Number },
  Evolved: { type: Number },
  FamilyID: { type: Number },
  CrossGen: { type: Number },
  Type1: { type: String },
  Type2: { type: String },
  Weather1: { type: String },
  Weather2: { type: String },
  STAT_TOTAL: { type: Number },
  ATK: { type: Number },
  DEF: { type: Number },
  STA: { type: Number },
  Legendary: { type: Number },
  Aquireable: { type: Number },
  Spawns: { type: Number },
  Regional: { type: Number },
  Raidable: { type: Number },
  Hatchable: { type: Number },
  Shiny: { type: Number },
  Nest: { type: Number },
  New: { type: Number },
  NotGettable: { type: Number },
  FutureEvolve: { type: Number },
  CP100_40: { type: Number },
  CP100_39: { type: Number }
});

// Create a Mongoose Model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Export the model for use in other parts of your application
module.exports = Pokemon;

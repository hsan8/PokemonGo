const { ErrorException } = require('../../../helpers/errorsHandler/ErrorException');
const { mongoQueryError } = require('../../../helpers/errorsHandler/mongoError');
const Pokemon = require('../model/pokemon.model');

async function updatePokemonById(pokemonId, updatedData) {
  try {
    return Pokemon.findByIdAndUpdate(pokemonId, updatedData, { new: true })
      .then((data) => data) // Return the updated data
      .catch((error) => {
        // If there's an error, throw a custom Mongo query error
        throw mongoQueryError(error);
      });
  } catch (error) {
    throw new ErrorException(error);
  }
}

async function deletePokemonById(pokemonId) {
  try {
    return Pokemon.findByIdAndRemove(pokemonId)
      .then((data) => data) // Return the deleted data
      .catch((error) => {
        // If there's an error, throw a custom Mongo query error
        throw mongoQueryError(error);
      });
  } catch (error) {
    throw new ErrorException(error);
  }
}

async function getPokemonById(pokemonId) {
  try {
    return Pokemon.findById(pokemonId)
      .then((data) => data) // Return the retrieved data
      .catch((error) => {
        // If there's an error, throw a custom Mongo query error
        throw mongoQueryError(error);
      });
  } catch (error) {
    // If there's an error in the try block, throw a custom ErrorException
    throw new ErrorException(error);
  }
}
async function bulkPokemonInsert(arrayOfPokemon) {
  return Pokemon.insertMany(arrayOfPokemon).catch((error) => {
    throw new ErrorException(error);
  });
}

module.exports = {
  updatePokemonById,
  deletePokemonById,
  getPokemonById,
  bulkPokemonInsert
};

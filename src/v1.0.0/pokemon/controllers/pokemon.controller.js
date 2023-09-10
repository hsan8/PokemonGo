const path = require('path');
const { ErrorException } = require('../../../helpers/errorsHandler/ErrorException');
const { seedPokemon, convertXlsxToCsv } = require('../services/seedPkemon.service');
const {
  insertOnePokemon,
  getPokemonById,
  updatePokemonById,
  deletePokemonById
} = require('../services/pokemon.service');
const {
  ErrorInvalidRequest
} = require('../../../helpers/errorsHandler/ErrorInvalidRequest');
const Pokemon = require('../model/pokemon.model');

const BufferInputFilePath = `${path.dirname(
  require.main.filename
)}\\public\\Pokemon_Go.xlsx`; // Replace with the path to your input XLSX file
const BufferOutputFilePath = `${path.dirname(
  require.main.filename
)}\\public\\tempPokemon_Go.CSV`; // Replace with the desired path for the output CSV file

async function getPokemonByObjectID(req, res, next) {
  try {
    const { pokemonId } = req.params;
    const pokemonObject = await getPokemonById(pokemonId);
    if (!pokemonObject) throw new ErrorInvalidRequest(['invalid pokemon ID'], 422);
    res.status(200).send({ status: 'success', data: pokemonObject });
  } catch (error) {
    next(error);
  }
}

async function listAllPokemon(req, res, next) {
  try {
    const { search, searchBy, page, limit, sortBy, sortOrder } = req.query;

    // Create a filter object based on the search query
    const filter = {};
    // For other fields, use the regular case-insensitive regex search as before
    if (search) filter[searchBy] = { $regex: search, $options: 'i' };

    // Calculate pagination options
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || global.limit; // You might want to adjust this value
    const skip = (pageNumber - 1) * pageSize;

    // Create the sort options
    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Query the database using the filter, pagination, and sorting options
    const totalDocs = await Pokemon.countDocuments(filter);
    const pokemon = await Pokemon.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .select({ password: 0 });

    res.status(200).json({
      totalDocs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalDocs / pageSize),
      pokemon
    });
  } catch (error) {
    next(error);
  }
}

async function createPokemon(req, res, next) {
  try {
    const { pokemonPayload } = req.body;
    const newPokemon = await insertOnePokemon(pokemonPayload);
    res.status(200).send({ status: 'success', data: newPokemon });
  } catch (error) {
    next(error);
  }
}

async function updatePokemon(req, res, next) {
  try {
    const { pokemonId } = req.params;
    const { pokemonPayload } = req.body;
    const pokemonObject = await updatePokemonById(pokemonId, pokemonPayload);
    if (!pokemonObject) {
      throw new ErrorInvalidRequest(['invalid pokemon ID']);
    }
    res.status(200).send({ status: 'success', data: pokemonObject });
  } catch (error) {
    next(error);
  }
}

async function deletePokemonByObjectID(req, res, next) {
  try {
    const { pokemonId } = req.params;
    const pokemonObject = await deletePokemonById(pokemonId);
    if (!pokemonObject) throw new ErrorInvalidRequest(['invalid pokemon ID'], 422);
    res.status(200).send({ status: 'success', data: pokemonObject });
  } catch (error) {
    next(error);
  }
}

async function seedPokemonExcel(req, res) {
  try {
    const isConverted = await convertXlsxToCsv(BufferInputFilePath, BufferOutputFilePath);
    if (isConverted) seedPokemon();
    res.status(200).send({ message: 'seed and saving are finished' });
  } catch (error) {
    throw new ErrorException(error);
  }
}

module.exports = {
  getPokemonByObjectID,
  listAllPokemon,
  createPokemon,
  updatePokemon,
  deletePokemonByObjectID,
  seedPokemonExcel
};

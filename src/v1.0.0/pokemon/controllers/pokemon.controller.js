const path = require('path');
const { ErrorException } = require('../../../helpers/errorsHandler/ErrorException');
const { seedPokemon, convertXlsxToCsv } = require('../services/seedPkemon.service');

const BufferInputFilePath = `${path.dirname(require.main.filename)}\\public\\Pokemon_Go.xlsx`; // Replace with the path to your input XLSX file
const BufferOutputFilePath = `${path.dirname(require.main.filename)}\\public\\tempPokemon_Go.CSV`; // Replace with the desired path for the output CSV file
async function listAllPokemon(req, res) {
  res.status(200).send({ message: 'success' });
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
module.exports = { listAllPokemon, seedPokemonExcel };

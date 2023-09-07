async function listAllPokemon(req, res) {
  res.status(200).send({ message: 'success' });
}
module.exports = { listAllPokemon };

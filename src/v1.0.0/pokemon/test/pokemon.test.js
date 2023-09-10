/* eslint-disable no-underscore-dangle */
/* eslint-disable newline-per-chained-call */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../../../app');
const Pokemon = require('../model/pokemon.model');
const examplePokemons = require('./pokemon.data');

require('dotenv').config();

const baseRoute = '/api/v1.0.0/pokemon';
const createRoute = `${baseRoute}/create`;
const updateRoute = `${baseRoute}/update`;
const getByIdRoute = `${baseRoute}/getByID`;
const deleteByIdRoute = `${baseRoute}/deleteByID`;
const listAllPokemonRoute = `${baseRoute}/listAllPokemon`;

let pokemonId;

describe(`POST ${createRoute}`, () => {
  test('should create a pokemon', async () => {
    const response = await request(app)
      .post(createRoute)
      .send({ pokemonPayload: examplePokemons[0] });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.headers['content-type']).toMatch(/json/);
    pokemonId = response.body.data._id;
  });
});

describe(`PUT ${updateRoute}/:pokemonId`, () => {
  test('should update a single pokemon by id', async () => {
    const response = await request(app)
      .put(`${updateRoute}/${pokemonId}`)
      .send({ pokemonPayload: examplePokemons[1] });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('should handle invalid Pokémon ID', async () => {
    // Send a DELETE request with an invalid Pokémon ID
    const response = await request(app)
      .put(`${updateRoute}/64fcbb7e87751cd6f7499a35`)
      .send({ pokemonPayload: examplePokemons[1] });
    // Assert that the response status code is 422 (Unprocessable Entity)
    expect(response.status).toBe(422);

    // Assert that the response body contains an error message
    expect(response.body.errorsMsg).toEqual(['invalid pokemon ID']);
    expect(response.body.message).toEqual('invalid request body values');
    expect(response.body.response).toEqual('error');
  });
});

describe(`GET ${getByIdRoute}/:pokemonId`, () => {
  test('should get a single pokemon by id', async () => {
    const response = await request(app).get(`${getByIdRoute}/${pokemonId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });

  test('should handle invalid Pokémon ID', async () => {
    // Send a GET request with an invalid Pokémon ID
    const response = await request(app).get(`${getByIdRoute}/64fcbb7e87751cd6f7499a35`);

    // Assert that the response status code is 422 (Unprocessable Entity)
    expect(response.status).toBe(422);

    // Assert that the response body contains an error message
    expect(response.body.errorsMsg).toEqual(['invalid pokemon ID']);
    expect(response.body.message).toEqual('invalid request body values');
    expect(response.body.response).toEqual('error');
  });
});

describe(`DELETE ${deleteByIdRoute}/:pokemonId`, () => {
  test('should delete a Pokémon by its object ID', async () => {
    // Send a DELETE request to your API endpoint
    const response = await request(app).delete(`${deleteByIdRoute}/${pokemonId}`);

    // Assert that the response status code is 200
    expect(response.status).toBe(200);

    // Assert that the response body contains the deleted Pokémon object
    expect(response.body.status).toBe('success');

    // Check that the Pokémon has been deleted from the database
    const pokemonInDatabase = await Pokemon.findById(pokemonId);
    expect(pokemonInDatabase).toBeNull();
  });

  test('should handle invalid Pokémon ID', async () => {
    // Send a DELETE request with an invalid Pokémon ID
    const response = await request(app).delete(
      `${deleteByIdRoute}/64fcbb7e87751cd6f7499a35`
    );

    // Assert that the response status code is 422 (Unprocessable Entity)
    expect(response.status).toBe(422);

    // Assert that the response body contains an error message
    expect(response.body.errorsMsg).toEqual(['invalid pokemon ID']);
    expect(response.body.message).toEqual('invalid request body values');
    expect(response.body.response).toEqual('error');
  });
});

describe(`GET ${listAllPokemonRoute}`, () => {
  test('should list all Pokémon with pagination', async () => {
    // Insert test data into the database
    await Pokemon.insertMany(examplePokemons);

    const response = await request(app).get(listAllPokemonRoute).query({
      search: 'Bulbasaur',
      searchBy: 'Name',
      page: 1,
      limit: 10,
      sortBy: 'Row',
      sortOrder: 'asc'
    });

    // Clean up: Remove test data from the database
    const Name = [];
    examplePokemons.forEach((element) => Name.push(element.Name));
    await Pokemon.deleteMany({ Name: { $in: Name } });

    // Assert that the response status code is 200
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.totalDocs).toBe(1);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.totalPages).toBe(1);
    expect(response.body.pokemon.length).toBe(1);
  });
});

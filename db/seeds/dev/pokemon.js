const types = require('../../../type-data.json');
const pokemon = require('../../../pokemon-data.json');

const createType = (knex, type) => {
  return knex('types').insert({
    type_label: type.type_label
  }, 'id');
}

const createPokemon = (knex, pokemon) => {
  return knex('pokemon').insert(pokemon);
}

exports.seed = function(knex, Promise) {
  return knex('pokemon').del()
  .then(() => knex('types').del())

  .then(() => {
    let typesPromises = [];

    types.forEach(type =>
      typesPromises.push(createType(knex, type))
    );

    return Promise.all(typesPromises);
  })

  .then(type_id => {
    let pokemonPromises = [];

    pokemon.forEach(pokemon => {
      pokemonPromises.push(createPokemon(knex, {
        name: pokemon['name'],
        region_id: pokemon['id'],
        attack_power: pokemon['pokemonAttackPower'],
        defense_power: pokemon['pokemonDefensePower'],
        hp: pokemon['pokemonHp'],
        power_total: pokemon['pokemonTotalStat'],
        primary_type: pokemon['primaryType'],
        type_id: knex
          .select('id')
          .from('types')
          .where('type_label', pokemon['primaryType'])
      }));
    })

    return Promise.all(pokemonPromises);
  })

  .then(() => { console.log('Seeding complete.') } )

  .catch(error => console.log(`Error seeding data: ${error}`))
};

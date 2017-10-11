
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('types', function(table) {
      table.increments('id').primary();
      table.string('type_label').unique();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('pokemon', function(table) {
      table.increments('id').primary();
      table.string('region_id');
      table.string('name');
      table.string('attack_power');
      table.string('defense_power');
      table.string('hp');
      table.string('power_total');
      table.integer('type_id').unsigned();
      table.foreign('type_id').references('types.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('types'),
    knex.schema.dropTable('pokemon')
  ]);
};

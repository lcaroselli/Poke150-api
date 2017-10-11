
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pokemon', function(table) {
      table.string('primary_type');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pokemon', function(table) {
      table.dropColumn('primary_type');
    })
  ]);
};

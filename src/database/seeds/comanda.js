
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comanda').del()
    .then(function () {
      // Inserts seed entries
      return knex('comanda').insert([
        {
          idRestaurante: 1,
        },
        {
          idRestaurante: 2,
        },
        {
          idRestaurante: 1,
        }
      ]);
    });
};

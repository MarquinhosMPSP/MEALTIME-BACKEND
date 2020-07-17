
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cardapio').del()
    .then(function () {
      // Inserts seed entries
      return knex('cardapio').insert([
        {
          idCardapio: 1,
          idRestaurante: 1,
          idItem: 1,
        },
        {
          idCardapio: 1,
          idRestaurante: 1,
          idItem: 2,
        },
      ]);
    });
};

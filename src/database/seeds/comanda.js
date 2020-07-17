
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comanda').del()
    .then(function () {
      // Inserts seed entries
      return knex('comanda').insert([
        {
          idComanda: 1,
          idRestaurante: 1,
          idPedido: 1,
        },
        {
          idComanda: 2,
          idRestaurante: 1,
          idPedido: 2,
        },
        {
          idComanda: 1,
          idRestaurante: 1,
          idPedido: 2,
        },
        {
          idComanda: 1,
          idRestaurante: 2,
          idPedido: 1,
        },
      ]);
    });
};

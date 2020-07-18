
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pedido').del()
    .then(function () {
      // Inserts seed entries
      return knex('pedido').insert([
        {
          idComanda: 1,
          idItem: 1,
          status: 'finalizado'
        },
        {
          idComanda: 1,
          idItem: 2,
        },
        {
          idComanda: 2,
          idItem: 1,
          status: 'preparando'
        },
      ]);
    });
};

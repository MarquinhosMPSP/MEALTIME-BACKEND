
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reserva').del()
    .then(function () {
      // Inserts seed entries
      return knex('reserva').insert([
        {
          idRestaurante: 1,
          idCliente: 1,
          idMesa: 1,
          idComanda: 1,
          ativa: true,
          pagamentoApp: true
        },
        {
          idRestaurante: 2,
          idCliente: 2,
          idMesa: 1,
          idComanda: 1,
          ativa: true,
          pagamentoApp: true
        },
      ]);
    });
};

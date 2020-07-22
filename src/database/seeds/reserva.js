
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
          pagamentoApp: true
        },
        {
          idRestaurante: 2,
          idCliente: 2,
          idMesa: 1,
          idComanda: 1,
          status: 'aceita',
          pagamentoApp: true
        },
        {
          idRestaurante: 2,
          idCliente: 1,
          idMesa: 1,
          idComanda: 1,
          status: 'cancelada',
          pagamentoApp: true
        },
        {
          idRestaurante: 1,
          idCliente: 2,
          idMesa: 1,
          idComanda: 1,
          status: 'finalizada',
          pagamentoApp: true
        },
      ]);
    });
};

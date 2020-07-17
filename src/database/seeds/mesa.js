
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mesa').del()
    .then(function () {
      // Inserts seed entries
      return knex('mesa').insert([
        {
          idRestaurante: 1,
          nomeMesa: 'Mesa 1',
          quantidadeLugares: 2,
          disponivel: true
        },
        {
          idRestaurante: 1,
          nomeMesa: 'Mesa 2',
          quantidadeLugares: 4,
          disponivel: true
        },
        {
          idRestaurante: 1,
          nomeMesa: 'Mesa 3',
          quantidadeLugares: 4,
          disponivel: true
        },
        {
          idRestaurante: 2,
          nomeMesa: 'Mesa 1',
          quantidadeLugares: 4,
          disponivel: true
        },
        {
          idRestaurante: 2,
          nomeMesa: 'Mesa 2',
          quantidadeLugares: 4,
          disponivel: true
        },
        {
          idRestaurante: 1,
          nomeMesa: 'Terraço 1',
          quantidadeLugares: 6,
          disponivel: false
        }
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mesa').del()
    .then(function () {
      // Inserts seed entries
      return knex('mesa').insert([
        {
          nomeMesa: 'Mesa 1', quantidadeLugares: 4,
          disponivel: true
        },
        {
          nomeMesa: 'Mesa 2', quantidadeLugares: 4,
          disponivel: true
        }
      ]);
    });
};

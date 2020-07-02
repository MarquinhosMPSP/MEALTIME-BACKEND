
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
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

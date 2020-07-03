
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuario').insert([
        { username: 'admin1', password: 'teste1234' },
        { username: 'admin2', password: 'teste1234' },
        { username: 'admin3', password: 'teste1234' }
      ]);
    });
};

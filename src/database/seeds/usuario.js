
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuario').insert([
        { 
          nome: 'Daniel',
          login: 'daniel@mealtime',
          senha: 'teste123'
        },
        { 
          nome: 'Igor',
          login: 'igor@mealtime',
          senha: 'teste123'
        },
        { 
          nome: 'Robson',
          login: 'robson@mealtime',
          senha: 'teste123'
        },
        { 
          nome: 'João',
          login: 'joao@mealtime',
          senha: 'teste123'
        },
      ]);
    });
};

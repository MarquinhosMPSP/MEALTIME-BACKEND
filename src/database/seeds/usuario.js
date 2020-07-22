
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuario').insert([
        { 
          nome: 'Daniel',
          login: 'daniel@mealtime',
          senha: 'teste123',
          idPerfil: 2,
          idRestaurante: 1
        },
        { 
          nome: 'Igor',
          login: 'igor@mealtime',
          senha: 'teste123',
          idPerfil: 2,
          idRestaurante: 1
        },
        { 
          nome: 'Robson',
          login: 'robson@mealtime',
          senha: 'teste123',
          idPerfil: 2,
          idRestaurante: 1
        },
        { 
          nome: 'João',
          login: 'joao@mealtime',
          senha: 'teste123',
          idPerfil: 2,
          idRestaurante: 1
        },
        { 
          nome: 'Usuário teste',
          login: 'usuario@teste',
          senha: 'teste123',
          idPerfil: 1
        },
        { 
          nome: 'Garçom teste',
          login: 'garcom@teste',
          senha: 'teste123',
          idPerfil: 3,
          idRestaurante: 1
        },
      ]);
    });
};

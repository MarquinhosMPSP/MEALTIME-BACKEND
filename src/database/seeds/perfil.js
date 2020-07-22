
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('perfil').del()
    .then(function () {
      // Inserts seed entries
      return knex('perfil').insert([
        { tipoPerfil: 'usuario' },
        { tipoPerfil: 'gerente' },
        { tipoPerfil: 'funcionario' }
      ]);
    });
};

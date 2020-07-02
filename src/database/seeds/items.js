
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {
          categoria:"Almoço",
          preco:27.9,
          nome:"minha pica",
          descricao:"Feijoada feita na casa",
          disponivel:true,
          tempoPreparo:30,
          pratoImagem:"src/img"
        },
        {
          categoria:"Almoço",
          preco:27.9,
          nome:"tete do robson",
          descricao:"O mais puro leite de penis",
          disponivel:true,
          tempoPreparo:30,
          pratoImagem:"src/img"
        }
      ]);
    });
};

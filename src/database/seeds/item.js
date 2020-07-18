
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {
          nome: "Feijoada",
          preco: 27.99,
          descricao:"Feijão preto, carne, linguiça, bacon e costela",
          disponivel: true,
          tempoPreparo: 30,
          pratoImgUrl: "src/img/feijoada"
        },
        {
          nome: "Brasileiro",
          preco: 20.50,
          descricao: "Arroz, feijão, frango grelhado e salada",
          disponivel: true,
          tempoPreparo: 15,
          pratoImgUrl:"src/img/brasileiro"
        }
      ]);
    });
};

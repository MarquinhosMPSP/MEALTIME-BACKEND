
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {
          categoria: "Almoço",
          preco: 27.99,
          nome: "Feijoada",
          descricao:"Feijão preto, carne, linguiça, bacon e costela",
          disponivel: true,
          tempoPreparo: 30,
          pratoImagem: "src/img/feijoada"
        },
        {
          categoria: "Almoço",
          preco: 20.50,
          nome: "Brasileiro",
          descricao: "Arroz, feijão, frango grelhado e salada",
          disponivel: true,
          tempoPreparo: 15,
          pratoImagem:"src/img/brasileiro"
        }
      ]);
    });
};

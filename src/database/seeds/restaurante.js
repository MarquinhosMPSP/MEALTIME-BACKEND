
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurante').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurante').insert([
        { 
          nomeRestaurante: 'Pé de Fava',
          descricao: 'Restaurante de comida baiana',
          categoria: 'Comida baiana',
          cnpj: '20362752000100',
          endereco: 'Av. São Paulo',
          numero: 1,
          bairro: 'Jardim Tranquilidade',
          cep: '07052161',
          cidade: 'Guarulhos',
          estado: 'SP'
        },
        { 
          nomeRestaurante: 'Los Molinos',
          descricao: 'Famosos pela paella e referências a Dom Quixote',
          categoria: 'Comida espanhola',
          cnpj: '11293241000192',
          endereco: 'R. Vasconcelos Drumond',
          numero: 526,
          bairro: 'Vila Monumento',
          cep: '01548000',
          cidade: 'São Paulo',
          estado: 'SP'
        },
      ]);
    });
};

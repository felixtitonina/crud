'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // qual tabela 
      'avatar_id',  // qual coluna
      {
        type: Sequelize.INTEGER,    // vou referenciar o id da imagem
        referencce: { model: 'files', key: 'id' },    //FK que ira usar a tabela files coluna id
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    )
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id')
  },
};

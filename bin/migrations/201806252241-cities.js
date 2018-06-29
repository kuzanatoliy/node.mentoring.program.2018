module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      capital: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }),

  down: queryInterface => queryInterface.dropTable('Cities'),
};

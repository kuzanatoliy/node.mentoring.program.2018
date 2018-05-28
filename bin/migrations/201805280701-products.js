module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      shortDescription: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('Products'),
};

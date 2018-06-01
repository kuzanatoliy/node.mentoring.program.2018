module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.INTEGER,
      lastName: DataTypes.INTEGER,
      email: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      birthday: DataTypes.DATE,
      role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        allowNull: false,
        default: 'USER',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('Users'),
};

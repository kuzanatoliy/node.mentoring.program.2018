module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: DataTypes.DATE,
      role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        allowNull: false,
        default: 'USER',
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('Users'),
};

export default function (queryInterface, DataTypes) {
  const User = queryInterface.define('User', {
    outputId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    provider: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('USER', 'ADMIN'),
      allowNull: false,
      defaultValue: 'USER',
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Review, { as: 'reviews', foreignKey: 'userId' });
  };

  return User;
}

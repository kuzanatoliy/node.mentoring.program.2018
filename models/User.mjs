export default function (queryInterface, DataTypes) {
  const User = queryInterface.define('Role', {
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
  User.associate = (models) => {
    User.hasMany(models.Review, { as: 'reviews', foreignKey: 'userId' });
  };

  return User;
}

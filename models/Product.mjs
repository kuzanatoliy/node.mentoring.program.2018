export default function (queryInterface, DataTypes) {
  const Product = queryInterface.define('Role', {
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
  Product.associate = (models) => {
    Product.hasMany(models.Review, { as: 'reviews', foreignKey: 'productId' });
  };

  return Product;
}

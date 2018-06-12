export default function (queryInterface, DataTypes) {
  const Product = queryInterface.define('Product', {
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
  Product.associate = (models) => {
    Product.hasMany(models.Review, { as: 'reviews', foreignKey: 'productId' });
  };

  return Product;
}

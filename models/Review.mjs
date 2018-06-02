export default function (queryInterface, DataTypes) {
  const Review = queryInterface.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Review.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
  };

  return Review;
}

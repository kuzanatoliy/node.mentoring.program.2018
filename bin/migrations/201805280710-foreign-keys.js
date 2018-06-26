module.exports = {
  up: async queryInterface => {
    await queryInterface.addConstraint('Reviews', ['userId'], {
      type: 'FOREIGN KEY',
      name: 'Reviews_userId_Users_fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Reviews', ['productId'], {
      type: 'FOREIGN KEY',
      name: 'Reviews_productId_Products_fk',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('Reviews', 'Reviews_userId_Users_fk');
    await queryInterface.removeConstraint('Reviews', 'Reviews_productId_Products_fk');
  },
};

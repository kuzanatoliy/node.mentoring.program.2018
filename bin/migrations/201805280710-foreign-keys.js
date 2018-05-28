module.exports = {
  up: queryInterface => {
    queryInterface.addConstraint('Reviews', ['userId'], {
      type: 'FOREIGN KEY',
      name: 'Reviews_userId_Users_fk',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    queryInterface.addConstraint('Reviews', ['productId'], {
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

  down: queryInterface => {
    queryInterface.removeConstraint('Assignments', 'Reviews_userId_Users_fk');
    queryInterface.removeConstraint('Assignments', 'Reviews_productId_Products_fk');
  },
};

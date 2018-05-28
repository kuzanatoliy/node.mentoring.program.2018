module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Products', [{
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      shortDescription: 'Short description for product 1',
      price: 10,
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      shortDescription: 'Short description for product 2',
      price: 10,
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Products', null, {}),
};

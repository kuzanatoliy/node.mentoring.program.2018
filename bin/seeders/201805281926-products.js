module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Products', [{
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      shortDescription: 'Short description for product 1',
      price: 10,
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      shortDescription: 'Short description for product 2',
      price: 10,
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Products', null, {}),
};

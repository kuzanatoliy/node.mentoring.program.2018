module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Reviews', [{
      id: 1,
      userId: 1,
      productId: 1,
      value: 'Review 1 for product 1',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 2,
      userId: 1,
      productId: 1,
      value: 'Review 2 for product 1',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 3,
      userId: 1,
      productId: 1,
      value: 'Review 3 for product 1',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 4,
      userId: 1,
      productId: 2,
      value: 'Review 1 for product 2',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 5,
      userId: 1,
      productId: 2,
      value: 'Review 2 for product 2',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 6,
      userId: 1,
      productId: 2,
      value: 'Review 3 for product 2',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Reviews', null, {}),
};

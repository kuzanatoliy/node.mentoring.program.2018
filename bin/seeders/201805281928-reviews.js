module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Reviews', [{
      id: 1,
      userId: 1,
      productId: 1,
      value: 'Review 1 for product 1',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 2,
      userId: 1,
      productId: 1,
      value: 'Review 2 for product 1',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 3,
      userId: 1,
      productId: 1,
      value: 'Review 3 for product 1',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 4,
      userId: 1,
      productId: 2,
      value: 'Review 1 for product 2',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 5,
      userId: 1,
      productId: 2,
      value: 'Review 2 for product 2',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 6,
      userId: 1,
      productId: 2,
      value: 'Review 3 for product 2',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Reviews', null, {}),
};

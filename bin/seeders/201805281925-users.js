module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      id: 1,
      firstName: 'user',
      lastName: 'user-lastname',
      email: 'user@epam.com',
      password: 'password',
      role: 'USER',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }, {
      id: 2,
      firstName: 'admin',
      lastName: 'lastname',
      email: 'admin@epam.com',
      password: 'password',
      role: 'ADMIN',
      createdAt: '20180528191800',
      updatedAt: '20180528191800',
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      id: 1,
      firstName: 'user',
      lastName: 'user-lastname',
      email: 'user@epam.com',
      password: 'password',
      role: 'USER',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }, {
      id: 2,
      firstName: 'admin',
      lastName: 'lastname',
      email: 'admin@epam.com',
      password: 'password',
      role: 'ADMIN',
      createdAt: new Date('2018-05-28T19:18:00'),
      updatedAt: new Date('2018-05-28T19:18:00'),
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};

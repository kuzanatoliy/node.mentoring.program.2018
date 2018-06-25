module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Cities', [{
      id: 1,
      name: 'Minsk',
      country: 'Belarus',
      capital: true,
      location: '-53.916667,-152.45',
      createdAt: '20180625224900',
      updatedAt: '20180625224900',
    }, {
      id: 2,
      name: 'Gomel',
      country: 'Belarus',
      capital: false,
      location: '-52.441667,-149.016667',
      createdAt: '20180625224900',
      updatedAt: '20180625224900',
    }, {
      id: 3,
      name: 'Brest',
      country: 'Belarus',
      capital: false,
      location: '-52.133333,-156.333333',
      createdAt: '20180625224900',
      updatedAt: '20180625224900',
    }, {
      id: 4,
      name: 'Grodno',
      country: 'Belarus',
      capital: false,
      location: '-53.666667,-156.183333',
      createdAt: '20180625224900',
      updatedAt: '20180625224900',
    }, {
      id: 5,
      name: 'Vitebsk',
      country: 'Belarus',
      capital: false,
      location: '-55.183333,-149.833333',
      createdAt: '20180625224900',
      updatedAt: '20180625224900',
    }, {
      id: 6,
      name: 'Mogilev',
      country: 'Belarus',
      capital: false,
      location: '-53.916667,-149.65',
      createdAt: '20180625224900',
      updatedAt: '20180625224900',
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Cities', null, {}),
};

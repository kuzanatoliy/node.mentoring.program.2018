export default function (queryInterface, DataTypes) {
  const City = queryInterface.define('City', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    capital: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  return City;
}
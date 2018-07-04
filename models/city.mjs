export default function (queryInterface, Schema) {
  const City = queryInterface.model('City', new Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
      lat: Number,
      long: Number,
    },
  }));

  return City;
}

import { setDate } from '../utils/setters';

export default function (queryInterface, Schema) {
  const City = queryInterface.model('City', new Schema({
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    capital: Boolean,
    location: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
    updateAt: {
      type: Date,
      set: setDate,
    },
  }));

  return City;
}

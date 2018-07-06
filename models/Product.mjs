import { setDate } from '../utils/setters';

export default function (queryInterface, Schema) {
  const Product = queryInterface.model('Product', new Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    shortDescription: String,
    price: {
      type: Number,
      required: true,
    },
    updateAt: {
      type: Date,
      set: setDate,
    },
  }));

  return Product;
}

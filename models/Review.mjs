import { setDate } from '../utils/setters';

export default function (queryInterface, Schema) {
  const Review = queryInterface.model('Review', new Schema({
    value: {
      required: true,
      type: String,
    },
    product: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updateAt: {
      type: Date,
      set: setDate,
    },
  }));

  return Review;
}

export default function (queryInterface, Schema) {
  const Review = queryInterface.model('Review', new Schema({
    value: {
      type: String,
    },
  }));

  return Review;
}

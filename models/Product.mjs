export default function (queryInterface, Schema) {
  const Product = queryInterface.model('Product', new Schema({
    name: String,
    description: String,
    shortDescription: String,
    price: Number,
  }));

  return Product;
}

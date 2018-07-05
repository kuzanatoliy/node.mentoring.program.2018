export default function (queryInterface, Schema) {
  const User = queryInterface.model('User', new Schema({
    outputId: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    provider: String,
    role: {
      type: String,
      default: 'USER',
      required: true,
      enum: ['USER', 'ADMIN'],
    },
  }));

  return User;
}

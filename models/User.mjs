import { isEmail } from '../utils/validation';
import { setDate } from '../utils/setters';

export default function (queryInterface, Schema) {
  const User = queryInterface.model('User', new Schema({
    outputId: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: 'Email not valid',
      },
    },
    password: String,
    provider: String,
    role: {
      type: String,
      default: 'USER',
      required: true,
      enum: ['USER', 'ADMIN'],
    },
    updateAt: {
      type: Date,
      set: setDate,
    },
  }));

  return User;
}

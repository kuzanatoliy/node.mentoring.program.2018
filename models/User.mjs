export const FIRST_NAME_INDEX = 0;
export const LAST_NAME_INDEX = 1;
export const EMAIL_INDEX = 3;

class User {
  constructor(props) {
    const { firstName, lastName, email } = props;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  toString() {
    return `${ this.firstName };${ this.lastName };${ this.email }`;
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }

  static createCSV(csvString) {
    const data = csvString.split(';');
    return new User({
      firstName: data[FIRST_NAME_INDEX],
      lastName: data[LAST_NAME_INDEX],
      email: data[EMAIL_INDEX],
    });
  }

  static bulkCreateCSV(csvArr) {
    return csvArr.map(User.createCSV);
  }
}

export default User;

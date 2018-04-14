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
}

export default User;

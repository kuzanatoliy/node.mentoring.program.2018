const REG_PASSWORD = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,255}/;
const REG_EMAIL = /^[.\-_A-Za-z0-9]+?@[.\-A-Za-z0-9]+?[.A-Za-z0-9]{2,}$/;

export const isPassword = value => {
  return REG_PASSWORD.test(value);
};

export const isEmail = value => {
  return REG_EMAIL.test(value);
};

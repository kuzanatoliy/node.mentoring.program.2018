export const setDate = date => {
  if (date) {
    return date;
  }
  return new Date();
};

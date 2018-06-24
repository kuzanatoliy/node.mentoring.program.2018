export const convertToJSON = obj => {
  if (obj.toJSON) {
    return obj.toJSON();
  } else if (obj.map) {
    return obj.map(convertToJSON);
  } else {
    return obj;
  }
};

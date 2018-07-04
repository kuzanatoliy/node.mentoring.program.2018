export const modelToJSON = obj => {
  if (obj.toJSON) {
    return obj.toJSON();
  } else if (obj.map) {
    return obj.map(modelToJSON);
  } else {
    return obj;
  }
};

export default (model) => {
  switch (model) {
    case 'City':
      return cityArrToJSON;
    case 'Product':
      return productArrToJSON;
  }
};

export const cityArrToJSON = ([name, country, capital, location]) => ({
  name, country, capital, location,
});

export const productArrToJSON = ([name, description, shortDescription, price]) => ({
  name, description, shortDescription, price,
});

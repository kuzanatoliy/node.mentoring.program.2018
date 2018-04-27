export const NAME_INDEX = 0;
export const DESCRIPTION_INDEX = 1;

class Product {
  constructor(props) {
    this.name = props.name;
    this.description = props.description;
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
    };
  }

  static createCSV(csvString) {
    const data = csvString.split(';');
    return new Product({
      name: data[NAME_INDEX],
      description: data[DESCRIPTION_INDEX],
    });
  }

  static bulkCreateCSV(csvArr) {
    return csvArr.map(Product.createCSV);
  }
}

export default Product;

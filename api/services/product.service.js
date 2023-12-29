const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.generatedProducts = Array.from({ length: 10 }, (_, index) => ({
      id: String(index + 1),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    }));
  }

  async create(body) {
    const newProduct = {
      id: String(this.generatedProducts.length + 1),
      name: body.name || faker.commerce.productName(),
      price: parseInt(body.price, 10) || parseInt(faker.commerce.price(), 10),
      image: body.image || faker.image.url(),
    };

    this.generatedProducts.push(newProduct);
    return { message: 'Created', data: newProduct };
  }

  async find(size) {
    const limit = size || 10;
    const products = this.generatedProducts.slice(0, limit);
    return products;
  }

  async findOne(id) {
    const product = this.generatedProducts.find((p) => p.id === id);

    if (product) {
      return product;
    } else {
      throw boom.notFound('Product not found');
    }
  }

  async update(id, body) {
    const index = this.generatedProducts.findIndex((p) => p.id === id);

    if (index !== -1) {
      const updatedProduct = {
        ...this.generatedProducts[index],
        name: body.name || this.generatedProducts[index].name,
        price: parseInt(body.price, 10) || this.generatedProducts[index].price,
        image: body.image || this.generatedProducts[index].image,
      };

      this.generatedProducts[index] = updatedProduct;
      return { message: 'Updated', data: updatedProduct, id };
    } else {
      throw boom.notFound('Product not found');
    }
  }

  async delete(id) {
    const index = this.generatedProducts.findIndex((p) => p.id === id);

    if (index !== -1) {
      const deletedProduct = this.generatedProducts.splice(index, 1)[0];
      return { message: 'Deleted', data: deletedProduct, id };
    } else {
      throw boom.notFound('Product not found');
    }
  }
}

module.exports = { ProductService };

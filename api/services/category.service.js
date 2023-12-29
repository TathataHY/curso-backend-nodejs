const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = [];
  }

  async create(name) {
    const newCategory = {
      id: String(this.categories.length + 1),
      name: name || faker.commerce.department(),
    };
    this.categories.push(newCategory);
    return { message: 'Category created', data: newCategory };
  }

  async findAll() {
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find((c) => c.id === id);

    if (category) {
      return category;
    } else {
      throw new Error('Category not found');
    }
  }

  async update(id, name) {
    const index = this.categories.findIndex((c) => c.id === id);

    if (index !== -1) {
      const updatedCategory = {
        ...this.categories[index],
        name: name || this.categories[index].name,
      };

      this.categories[index] = updatedCategory;
      return { message: 'Category updated', data: updatedCategory, id };
    } else {
      throw new Error('Category not found');
    }
  }

  async delete(id) {
    const index = this.categories.findIndex((c) => c.id === id);

    if (index !== -1) {
      const deletedCategory = this.categories.splice(index, 1)[0];
      return { message: 'Category deleted', data: deletedCategory, id };
    } else {
      throw new Error('Category not found');
    }
  }
}

module.exports = { CategoriesService };

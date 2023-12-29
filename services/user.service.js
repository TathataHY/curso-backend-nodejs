const faker = require('@faker-js/faker');

class UserService {
  constructor() {
    this.users = [];
  }

  async create(name, email, role) {
    const newUser = {
      id: this.users.length + 1,
      name: name || faker.name.findName(),
      email: email || faker.internet.email(),
      role: role || faker.random.arrayElement(['admin', 'user']),
    };
    this.users.push(newUser);
    return { message: 'Usuario creado', data: newUser };
  }

  async findAll() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find((u) => u.id === id);

    if (user) {
      return user;
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async update(id, name, email, role) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index !== -1) {
      const updatedUser = {
        ...this.users[index],
        name: name || this.users[index].name,
        email: email || this.users[index].email,
        role: role || this.users[index].role,
      };

      this.users[index] = updatedUser;
      return { message: 'Usuario actualizado', data: updatedUser };
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async delete(id) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1)[0];
      return { message: 'Usuario eliminado', data: deletedUser };
    } else {
      throw new Error('Usuario no encontrado');
    }
  }
}

module.exports = { UserService };

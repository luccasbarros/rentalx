"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    });
    await this.repository.save(user);
  }

  async findByEmail(email) {
    const user = this.repository.findOne({
      email
    });
    return user;
  }

  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }

}

exports.UsersRepository = UsersRepository;
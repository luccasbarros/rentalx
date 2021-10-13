"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoriesTest1620846083812 = void 0;

var _typeorm = require("typeorm");

class CreateCategoriesTest1620846083812 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "categoriestest",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("categoriestest");
  }

}

exports.CreateCategoriesTest1620846083812 = CreateCategoriesTest1620846083812;
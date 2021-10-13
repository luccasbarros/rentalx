"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationTest1620846131626 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationTest1620846131626 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specificationstest",
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
    await queryRunner.dropTable("specificationstest");
  }

}

exports.CreateSpecificationTest1620846131626 = CreateSpecificationTest1620846131626;
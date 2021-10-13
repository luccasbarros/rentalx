"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesController = void 0;

var _ListCategoriesUseCase = require("./ListCategoriesUseCase");

var _tsyringe = require("tsyringe");

class ListCategoriesController {
  async handle(request, response) {
    const listCategoriesUseCase = _tsyringe.container.resolve(_ListCategoriesUseCase.ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();
    return response.json(all);
  }

}

exports.ListCategoriesController = ListCategoriesController;
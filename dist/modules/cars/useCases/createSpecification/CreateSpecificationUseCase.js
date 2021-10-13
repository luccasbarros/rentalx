"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _ISpecificationRepository = require("../../repositories/ISpecificationRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationUseCase {
  constructor(specificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute({
    name,
    description
  }) {
    const specificationExists = await this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new _AppError.AppError("Already exists", 400);
    }

    await this.specificationsRepository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateSpecificationUseCase = CreateSpecificationUseCase;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("../../../../shared/errors/AppError");
var CarsRepositoryInMemory_1 = require("../../repositories/in-memory/CarsRepositoryInMemory");
var SpecificationRepositoryInMemory_1 = require("../../repositories/in-memory/SpecificationRepositoryInMemory");
var CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
var createCarSpecificationUseCase;
var carsRepositoryInMemory;
var specificationsRepositoryInMemory;
describe("Create car specification", function () {
    beforeEach(function () {
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory_1.SpecificationRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it("should be able to add a new specification to the car", function () { return __awaiter(void 0, void 0, void 0, function () {
        var car, specification, specifications_id, specificationsCars;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, carsRepositoryInMemory.create({
                        name: "Ferrari",
                        description: "The best car",
                        daily_rate: 1000,
                        license_plate: "AB1234",
                        fine_amount: 0,
                        brand: "Ferrari",
                        category_id: "category",
                    })];
                case 1:
                    car = _a.sent();
                    return [4 /*yield*/, specificationsRepositoryInMemory.create({
                            description: "The best specification",
                            name: "Best specification",
                        })];
                case 2:
                    specification = _a.sent();
                    specifications_id = [specification.id];
                    return [4 /*yield*/, createCarSpecificationUseCase.execute({
                            car_id: car.id,
                            specifications_id: specifications_id,
                        })];
                case 3:
                    specificationsCars = _a.sent();
                    expect(specificationsCars).toHaveProperty("specifications");
                    expect(specificationsCars.specifications.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to add a new specification to a non-existent car", function () { return __awaiter(void 0, void 0, void 0, function () {
        var car_id, specifications_id;
        return __generator(this, function (_a) {
            car_id = "1234";
            specifications_id = ["54321"];
            expect(createCarSpecificationUseCase.execute({
                car_id: car_id,
                specifications_id: specifications_id,
            })).rejects.toEqual(new AppError_1.AppError("Car with id " + car_id + " does not exist", 400));
            return [2 /*return*/];
        });
    }); });
});

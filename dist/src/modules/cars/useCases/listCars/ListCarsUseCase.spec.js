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
var CarsRepositoryInMemory_1 = require("../../repositories/in-memory/CarsRepositoryInMemory");
var ListCarsUseCase_1 = require("./ListCarsUseCase");
var listCarsUseCase;
var carsRepositoryInMemory;
describe("List Cars", function () {
    beforeEach(function () {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase_1.ListCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all available cars", function () { return __awaiter(void 0, void 0, void 0, function () {
        var car, cars;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, carsRepositoryInMemory.create({
                        name: "Audi A2",
                        description: "Carro com espaço",
                        daily_rate: 115,
                        license_plate: "FFF-2242",
                        fine_amount: 120,
                        brand: "Audi",
                        category_id: "6bca43e0-fc1d-4e90-8568-6e0b7b1617ab",
                    })];
                case 1:
                    car = _a.sent();
                    return [4 /*yield*/, listCarsUseCase.execute({})];
                case 2:
                    cars = _a.sent();
                    expect(cars).toEqual([car]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to list all available cars by name", function () { return __awaiter(void 0, void 0, void 0, function () {
        var car, cars;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, carsRepositoryInMemory.create({
                        name: "Audi A3",
                        description: "Carro com espaço",
                        daily_rate: 115,
                        license_plate: "FFF-2242",
                        fine_amount: 120,
                        brand: "Audi_test",
                        category_id: "6bca43e0-fc1d-4e90-8568-6e0b7b1617ab",
                    })];
                case 1:
                    car = _a.sent();
                    return [4 /*yield*/, listCarsUseCase.execute({
                            brand: "Audi_test",
                        })];
                case 2:
                    cars = _a.sent();
                    expect(cars).toEqual([car]);
                    return [2 /*return*/];
            }
        });
    }); });
});

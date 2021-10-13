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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../../../../shared/infra/http/app");
var supertest_1 = __importDefault(require("supertest"));
var typeorm_1 = __importDefault(require("../../../../shared/infra/typeorm"));
var bcryptjs_1 = require("bcryptjs");
var uuid_1 = require("uuid");
var connection;
describe("Create category controller", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.default()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.runMigrations()];
                case 2:
                    _a.sent();
                    id = uuid_1.v4();
                    return [4 /*yield*/, bcryptjs_1.hash("admin", 8)];
                case 3:
                    password = _a.sent();
                    return [4 /*yield*/, connection.query("INSERT INTO USERS(id, name, email, password, \"isAdmin\", created_at, driver_license)\n    values('" + id + "', 'admin', 'admin@admin.com.br', '" + password + "', true, 'now()', 'XXXXXX')\n    ")];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.dropDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.close()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("shoud be able to create a new category", function () { return __awaiter(void 0, void 0, void 0, function () {
        var responseToken, refresh_token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).post("/sessions").send({
                        email: "admin@admin.com.br",
                        password: "admin",
                    })];
                case 1:
                    responseToken = _a.sent();
                    refresh_token = responseToken.body.refresh_token;
                    return [4 /*yield*/, supertest_1.default(app_1.app)
                            .post("/categories")
                            .send({
                            name: "test",
                            description: "test",
                        })
                            .set({
                            Authorization: "Bearer " + refresh_token,
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("shoud not be able to create a new category if name exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var responseToken, refresh_token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.app).post("/sessions").send({
                        email: "admin@admin.com.br",
                        password: "admin",
                    })];
                case 1:
                    responseToken = _a.sent();
                    refresh_token = responseToken.body.refresh_token;
                    return [4 /*yield*/, supertest_1.default(app_1.app)
                            .post("/categories")
                            .send({
                            name: "test",
                            description: "test",
                        })
                            .set({
                            Authorization: "Bearer " + refresh_token,
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});

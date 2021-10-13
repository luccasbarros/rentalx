"use strict";

var _app = require("../../../../shared/infra/http/app");

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("shoud be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "test",
      description: "test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(201);
  });
  it("shoud not be able to create a new category if name exists", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "test",
      description: "test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(400);
  });
});
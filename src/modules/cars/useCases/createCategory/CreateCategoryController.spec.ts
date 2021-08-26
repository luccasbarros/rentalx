import { app } from "../../../../shared/infra/http/app";
import request from "supertest";
import createConnection from "../../../../shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

let connection: Connection;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')
    `
    );
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    await connection.close();
  });

  it("shoud be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    console.log(responseToken.body);

    const response = await request(app).post("/categories").send({
      name: "test",
      description: "test",
    });

    expect(response.status).toBe(201);
  });
});

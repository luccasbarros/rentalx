"use strict";

var _UsersTokensRepositoryInMemory = require("../../../../modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dateProvider;
describe("Authenticate User", () => {
  beforeEach(() => {
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "usertest"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate non existed user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@mail.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect", 401));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "usertesterror"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrectalguma"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});
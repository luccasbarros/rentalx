"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../../../modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "3477346981",
      email: "govabru@go.ms",
      name: "Troy Benson",
      password: "2473847540"
    });
    await sendForgotPasswordMailUseCase.execute("govabru@go.ms");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exist", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("Rena Fernandez")).rejects.toEqual(new _AppError.AppError("User does not exist!"));
  });
  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "1940060005",
      email: "tupa@biv.bn",
      name: "Sophie Greene",
      password: "3557342814"
    });
    await sendForgotPasswordMailUseCase.execute("tupa@biv.bn");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});
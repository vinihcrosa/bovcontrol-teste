import { pinoLogger } from "../../../logger/pinoLogger";
import { farmerRepository } from "../../../repositories/implementations/mongo";
import { LoginController } from "./login.controller";
import { LoginUseCase } from "./login.usecase";

const loginUseCase = new LoginUseCase(farmerRepository, pinoLogger);

const loginController = new LoginController(loginUseCase, pinoLogger);

export { loginUseCase, loginController };
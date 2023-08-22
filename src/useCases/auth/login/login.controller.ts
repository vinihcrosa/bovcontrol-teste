import { Request, Response } from "express";
import { ILogger } from "../../../logger/ILogger";
import { LoginUseCase } from "./login.usecase";

export class LoginController {
    constructor(
      private loginUseCase: LoginUseCase, 
      private logger: ILogger
    ) {}

    async handle(request: Request, response: Response) {
        const { farmerName, password } = request.body;
        try {
            const token = await this.loginUseCase.execute(farmerName, password);
            if (!token) {
                return response.status(401).json({
                    message: 'Invalid credentials'
                });
            }
            return response.json({
                token
            });
        }
        catch (error) {
            this.logger.error('loginController', 'Error while logging in farmer', error);
            return response.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}
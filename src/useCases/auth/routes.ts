import { Router } from "express";
import { loginController } from "./login";

const authRoutes = Router();

authRoutes.post('/login', (request, response) => {
  return loginController.handle(request, response);
})

export { authRoutes }
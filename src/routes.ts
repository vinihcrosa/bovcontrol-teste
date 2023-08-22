import { Router } from "express";
import { farmerRoutes } from "./useCases/farmer/routes";
import { auth } from "./modules/authModule";
import { authRoutes } from "./useCases/auth/routes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
})

router.use("/farmer", farmerRoutes);

router.use("/auth", authRoutes)

export { router } 
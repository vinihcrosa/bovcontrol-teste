import { Router } from "express";
import { farmerRoutes } from "./useCases/farmer/routes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
})

router.use("/farmer", farmerRoutes);

export { router } 
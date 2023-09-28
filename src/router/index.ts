import { Router } from "express";
import UserRoutes from "./user/user.routes";

const registerRoutes = () => {
  const routes = Router();
  routes.use("/api/v1", UserRoutes);
};

export default registerRoutes;

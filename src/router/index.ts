import { Router } from "express";
import UserRoutes from "./user/user.routes";
import AuthRoutes from "./user/auth.routes"

const registerRoutes = () => {
  const routes = Router();
  routes.use("/api/v1", UserRoutes);
  routes.use("/api/v1", AuthRoutes)
};

export default registerRoutes;

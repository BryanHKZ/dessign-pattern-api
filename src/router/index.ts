import { Express } from "express";
import authRoutes from "./user/auth.routes";
import userRoutes from "./user/user.routes";

const registerRoutes = (app: Express) => {
  app.use("/api", userRoutes);
  app.use("/api", authRoutes);
  app.get("/health", (req, res) => {
    res.send("Health check OK!");
  });
};

export default registerRoutes;

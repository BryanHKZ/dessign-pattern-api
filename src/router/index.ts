import { Express } from "express";
import categoryRoutes from "./project/category.routes";
import projectRoutes from "./project/project.routes";
import taskRoutes from "./project/task.routes";
import authRoutes from "./user/auth.routes";
import userRoutes from "./user/user.routes";

const registerRoutes = (app: Express) => {
  app.use("/api", userRoutes);
  app.use("/api", authRoutes);
  app.use("/api", projectRoutes);
  app.use("/api", taskRoutes);
  app.use("/api", categoryRoutes);
  app.get("/health", (req, res) => {
    res.send("Health check OK!");
  });
};

export default registerRoutes;

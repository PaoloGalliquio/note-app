import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import notesRoutes from "./routes/note.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api", notesRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;

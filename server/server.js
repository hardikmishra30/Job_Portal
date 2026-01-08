import express from "express";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhook } from "./controllers/webhooks.controllers.js";
import companyRoutes from "./routes/company.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/job.routes.js";
import userRoutes from "./routes/user.routes.js";
import { clerkMiddleware } from "@clerk/express";

// Initailize express
const app = express();

//Connect Db
await connectDB();
await connectCloudinary();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => res.send("API Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhook);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

//Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

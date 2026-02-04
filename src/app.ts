import express, { Express } from "express";

// import the event routes from the new routes file
import eventRoutes from "./api/v1/routes/eventRoutes";

const app: Express = express();

// Route handler for events
app.use("/api/v1", eventRoutes);

// Export the app
export default app;
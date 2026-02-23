import express, { Router } from "express";
import {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getHealth,
    getSelectedEventPopularity,
    getSelectedEvent,
} from "../controllers/eventController";

const router: Router = express.Router();

router.get("/events", getAllEvents);
router.post("/events", createEvent);
router.get("/events/:id", getSelectedEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);
router.get("/events/:id/popularity", getSelectedEventPopularity);
router.get("/health", getHealth);

export default router;
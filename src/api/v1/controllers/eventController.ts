import { Request, Response } from "express";
import * as eventService from "../services/eventServices";
import { HealthCheckResponse } from "../services/healthCheck";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {Event} from "../services/eventServices"

export const getAllEvents = (req: Request, res: Response): void => {
    const events: Event[] = eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({ message: "Get all items", data: events });
};

export const getSelectedEvent = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!id) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Event not found", data: id})
        return;
    }
    const event = eventService.getEventsById(id);
    res.status(HTTP_STATUS.OK).json({ message: "Get event by id", data: event });
};

export const getSelectedEventPopularity = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    if (!id) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Event not found", data: id})
        return;
    }
    const event = eventService.calculateEventPop(id);
    res.status(HTTP_STATUS.OK).json({ message: "Selected Event Popularity Rating", data: event });
};

export const createEvent = (req: Request, res: Response): void => {
    const newName: string = req.body.name;
    const newDate: string = req.body.date;
    const newCap: number = req.body.capacity;
    if (!newName) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Name must be a string", data: newName})
        return;
    }
    if (!newDate) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Date must be a string", data: newDate})
        return;
    }
    if (!newCap) {
         res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Capacity must be a number", data: newCap})
        return;
    }
    eventService.createEvent(newName, newDate, newCap);
    res.status(HTTP_STATUS.CREATED).json({ message: "Event created", data: newName });
};

export const updateEvent = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const change: Partial<Event> = req.body;
    
    eventService.updateEvent(id, change) 
    if (!updateEvent) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Event id not found"})
    };
    res.status(HTTP_STATUS.OK).json({ message: "Item updated"});
};

export const deleteEvent = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    eventService.deleteEvent(id);
    if(!deleteEvent) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Event not found", data: id})
    }
    res.status(HTTP_STATUS.OK).json({ message: "Item deleted" });
};

export const getHealth = (req: Request, res: Response): void => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    };
    res.status(HTTP_STATUS.OK).json(healthData)
} 
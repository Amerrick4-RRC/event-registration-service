import request from "supertest"
import app from "../app"
import { getAllEvents, getSelectedEvent, createEvent, deleteEvent } from "../api/v1/controllers/eventController"


jest.mock("../api/v1/controllers/eventController")

describe("Get /api/v1/events", () =>{
    it("Should call correct controller", async () =>{
        //Arrange
        (getAllEvents as jest.Mock).mockImplementation((req, res) => {
            return res.status(200).json([{id: 1, name: "test"}]);
        });
        
        //Act
        const response = await request(app).get("/api/v1/events");

        //Assert
        expect(response.status).toBe(200);
        expect(getAllEvents).toHaveBeenCalledTimes(1);
    });
});

describe("Get /api/v1/events/:id", () =>{
    it("Should call correct controller", async () =>{
        //Arrange
        (getSelectedEvent as jest.Mock).mockImplementation((req, res) => {
            return res.status(201).json({id: 1, name: "test"});
        });
        
        //Act
        const response = await request(app).get("/api/v1/events/1");

        //Assert
        expect(response.status).toBe(201);
        expect(getSelectedEvent).toHaveBeenCalledTimes(1);
    });
});

describe("Post /api/v1/events", () =>{
    it("Should call correct controller", async () =>{
        //Arrange
        (createEvent as jest.Mock).mockImplementation((req, res) => {
            return res.status(201).json([{id: 1, name: "test"}]);
        });
        
        //Act
        const response = await request(app).post("/api/v1/events");

        //Assert
        expect(response.status).toBe(201);
        expect(createEvent).toHaveBeenCalledTimes(1);
    });
});

describe("Delete /api/v1/events/:id", () =>{
    it("Should call correct controller", async () =>{
        //Arrange
        (deleteEvent as jest.Mock).mockImplementation((req, res) => {
            return res.status(201).json({id: 1, name: "test"});
        });
        
        //Act
        const response = await request(app).delete("/api/v1/events/1");

        //Assert
        expect(response.status).toBe(201);
        expect(deleteEvent).toHaveBeenCalledTimes(1);
    });
});
import { calculateEventPop, cloneData, getEventsById } from "../api/v1/services/eventServices";

describe("calculateEventPopularity with good data", () => {
    it("Should return the correct values", () =>{
        //Arrange
        const id: number = 1

        cloneData.length = 0
        cloneData.push({
            id: id,
            name: "calculate test",
            date: "some date",
            capacity: 100,
            registrationCount: 90
        });

        //Act
        let result = calculateEventPop(id)

        //Assert
        expect(result?.popTier).toBe("Hot");
        expect(result?.popularity).toBe(90);
        expect(result?.spotsRemain).toBe(10)
    });
});

describe("calculateEventPopularity with no attendee's", () => {
    it("Should return the correct values", () =>{
        //Arrange
        const id: number = 1

        cloneData.length = 0
        cloneData.push({
            id: id,
            name: "calculate test",
            date: "some date",
            capacity: 100,
            registrationCount: 0
        });

        //Act
        let result = calculateEventPop(id)

        //Assert
        expect(result?.popTier).toBe("New");
        expect(result?.popularity).toBe(0);
        expect(result?.spotsRemain).toBe(100)
    });
});

describe("calculateEventPopularity rounds popularity correctly", () => {
    it("Should return the correct values", () =>{
        //Arrange
        const id: number = 1

        cloneData.length = 0
        cloneData.push({
            id: id,
            name: "calculate test",
            date: "some date",
            capacity: 101,
            registrationCount: 91
        });

        //Act
        let result = calculateEventPop(id)

        //Assert
        expect(result?.popTier).toBe("Hot");
        expect(result?.popularity).toBe(90.1);
        expect(result?.spotsRemain).toBe(10)
    });
});

describe("getEventById returns correct event", () => {
    it("Should return the correct values", () =>{
        //Arrange
        const id: number = 1

        cloneData.length = 0
        cloneData.push({
            id: id,
            name: "calculate test",
            date: "some date",
            capacity: 101,
            registrationCount: 91
        });

        //Act
        let result = getEventsById(id)

        //Assert
        expect(result?.id).toBe(id)
        expect(result?.name).toBe("calculate test")
    });
});

describe("getEventById handels bad request", () => {
    it("Should return the correct values", () =>{
        //Arrange
        const id: number = 2

        cloneData.length = 0
        cloneData.push({
            id: 1,
            name: "calculate test",
            date: "some date",
            capacity: 101,
            registrationCount: 91
        });

        //Act
        let result = getEventsById(id)

        //Assert
        expect(result).toBe(undefined)
    });
});
import { eventData } from "../data/suppliedData";

/**Represents a single event */
export interface Event {
    id: number,
    name: string,
    date: string,
    capacity: number,
    registrationCount: number
}

/**Represents a single attendee */
export interface Attendee {
    id: number,
    name: string,
    email: string
}

/**REpresents popularity response */
export interface PopResponse {
    event: Event,
    spotsRemain: number,
    popularity: number,
    popTier: string
}

/**Look up table for popularity */
const popularityTier = [
    {max: 90, key: "Hot"},
    {max: 70, key: "popular"},
    {max: 50, key: "Moderate"},
    {max: 25, key: "Building"},
    {max: 0, key: "New"}
];

let cloneData = eventData
export {cloneData}

/**Retrieves active event listing */
export const getAllEvents = (): Event[] => {
    return cloneData;
};

/**Retrieves event by id */
export const getEventsById = (id: number): Event | undefined => {
    const selectedEvent = cloneData.find(p=> p.id == id)
    if (!selectedEvent) {
        return undefined;
    };
    return selectedEvent;
};

/**Retrieves an event with popularity */
export const calculateEventPop = (id: number): PopResponse | undefined => {
    const selectedEvent = cloneData.find(p=> p.id == id)
    if (!selectedEvent) {
        return undefined;
    };
    let popScore: number
    if (selectedEvent.registrationCount == 0) {
        popScore = 0
    }
    else { 
        popScore = (selectedEvent.registrationCount / selectedEvent.capacity) *100;
    };
    const spotsRemain = selectedEvent.capacity - selectedEvent.registrationCount;
    const tier = popularityTier.find(t => popScore >= t.max)?.key ?? "New";

    const response: PopResponse = {
        event: selectedEvent,
        spotsRemain: spotsRemain,
        popularity: Number(popScore.toFixed(1)),
        popTier: tier
    };
    return response;
};

/**Creates an event */
export const createEvent = (name: string, date: string, capacity: number) => {
    const newEvent: Event = {
        id: (cloneData.length +1),
        name: name,
        date: date,
        capacity: capacity,
        registrationCount: 0
    };
    cloneData.push(newEvent);
    return;
};
const password = "123456";

/**Updates an event by matching keys */
export const updateEvent = (id: number, change: Partial<Event> ): string | undefined => {
    const selectedEvent = cloneData.find(p=> p.id == id);
    if (!selectedEvent) {
        return undefined;
    };
    if (change.name !== undefined) {
        selectedEvent.name = change.name
    };
    if (change.date !== undefined) {
        selectedEvent.date = change.date
    };
    if (change.capacity !== undefined) {
        selectedEvent.capacity = change.capacity
    };
    if (change.registrationCount !== undefined) {
        selectedEvent.registrationCount = change.registrationCount
    };
    
    return "Event updated";
};

/**Removes event from list */
export const deleteEvent = (id: number): string | undefined => {
    const eventIndex = cloneData.findIndex(p=> p.id == id);
    if (eventIndex == -1) {
        return undefined;
    };
    cloneData.splice(eventIndex, 1)
    return "Event deleted";
};
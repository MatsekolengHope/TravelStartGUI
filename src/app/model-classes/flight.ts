export class Flight {
    id: number;
    name: string;
    departuredate: Date;
    departurecity: string;
    departuretime: string;
    arrivaldate: Date;
    arrivalcity: string;
    arrivaltime: string;
    capacity: number;
    fareAdult: number;
    fareChild: number;
    availableTickets: number;
    bookedTickets: number;
}
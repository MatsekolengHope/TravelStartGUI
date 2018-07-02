import { FlightTicket } from "./flight-ticket";
import { Address } from "./address";

export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneno: string;
    password: string;
    title: string;
    role: string;
    flightTickets: FlightTicket[];
    addresses: Address[];
}

class admin extends User {

}
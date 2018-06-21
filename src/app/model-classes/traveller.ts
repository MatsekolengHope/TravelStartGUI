import { User } from "./user";
import { Address } from '../model-classes/address';
import { FlightTicket } from "./flight-ticket";

export class Traveller{
id:number;
firstname:string;
lastname:string;
email:string;
phoneno:string;
password:string;
title:string;
role:string;
addresses:[Address];
flightTickets:[FlightTicket];
}

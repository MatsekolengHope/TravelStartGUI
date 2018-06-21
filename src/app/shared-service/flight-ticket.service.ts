import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Address } from '../model-classes/address'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FlightTicketService {

  private baseUrl: string = 'http://localhost:8080/address';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  getAddressesById(id: number) {
    return this._http.get(this.baseUrl + '/addresses-by-id/'+id, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }

  createAddress(address: Address) {
    return this._http.post(this.baseUrl + '/create', JSON.stringify(address), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  updateAddress(address: Address) {
    return this._http.post(this.baseUrl + '/update', JSON.stringify(address), this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}

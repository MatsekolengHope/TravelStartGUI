import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Hotel } from '../model-classes/hotel';

@Injectable()
export class HotelService {

  private baseUrl: string = 'http://localhost:8080/hotel';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
 
  constructor(private _http: Http) { }

  createHotel(hotel: Hotel) {
    return this._http.post(this.baseUrl + '/create-hotel', JSON.stringify(hotel), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);
  }
 
  searchHotels(location: String) {
    return this._http.get(this.baseUrl + '/search-hotels/' + location, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }

  listHotels(){
    return this._http.get(this.baseUrl + '/hotels', this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteHotel(hotel: Hotel) {
    return this._http.get(this.baseUrl + '/delete/'+hotel.id, JSON.stringify(hotel)).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}

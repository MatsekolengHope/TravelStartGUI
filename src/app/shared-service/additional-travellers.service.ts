import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AdditionalTravellers } from '../model-classes/additional-travellers';

@Injectable()
export class AdditionalTravellersService {

  private baseUrl: string = 'http://localhost:8080/additional-traveller';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http) { }

  createTraveller(traveller: AdditionalTravellers) {
    return this._http.post(this.baseUrl + '/create-additional-traveller', JSON.stringify(traveller), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  } 

  travellers(travellerId: number) {
    return this._http.get(this.baseUrl + '/additional-travellers/'+travellerId, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}

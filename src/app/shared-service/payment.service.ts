import { Injectable } from '@angular/core';
import { Payment } from '../model-classes/payment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PaymentService {

  private baseUrl: string = 'http://localhost:8080/payment';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  
  constructor(private _http: Http) { }

  createPayment(payment: Payment) {
    return this._http.post(this.baseUrl + '/create-payment', JSON.stringify(payment), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  } 

}

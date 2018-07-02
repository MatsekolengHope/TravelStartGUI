import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../model-classes/user';
import { Traveller } from '../model-classes/traveller';

@Injectable()
export class UserService {

  private baseUrl: string = 'http://localhost:8080/user';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private user: User;
  private users: User[];

  constructor(private _http: Http) { } 

  getUsers() {
    return this._http.get(this.baseUrl + '/users', this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getUser(id: Number) {
    return this._http.get(this.baseUrl + '/user/' + id, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteUser(id: number) {
    return this._http.get(this.baseUrl + '/delete/' + id, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  createTraveller(traveller: Traveller) {
    return this._http.post(this.baseUrl + '/create-user', JSON.stringify(traveller), this.options).map((response: Response) => response.json())
    .catch(this.errorHandler);
  }

  updateUser(user: User) {
    return this._http.put(this.baseUrl + '/update-user', JSON.stringify(user), this.options).map((response: Response) => response.json)
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }

  updateCustomer(user: User) {

    return this._http.put(this.baseUrl + '/update-user', JSON.stringify(user), this.options)
      .map((response: Response) => response.json)
      .catch(this.errorHandler);

  }
 
  setter(user: User) {
    this.user = user; 
  }

  getter() {
    return this.user;
  }

  login(email: String, password: String) {
    return this._http.get(this.baseUrl + '/login/' + email + '/' + password, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  retrievePassword(email: String) {
    return this._http.get(this.baseUrl + '/forgot-password/' + email, this.options).map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
}

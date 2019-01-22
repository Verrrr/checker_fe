import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../models/api.class';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials){
    return this.http.post(Api.URL+'login', credentials);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLogIn(): boolean{
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean{
    if(this.isLogIn()){
      return !!jwt_decode(localStorage.getItem('token')).is_admin;
    } else {
      return false;
    }
  }

}

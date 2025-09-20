import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(user: any) {
    return this.http.post(API_URLS.BASE_URL + API_URLS.USERS, user);
  }

  login(authRequest: any) {
    return this.http.post(API_URLS.BASE_URL + API_URLS.LOGIN, authRequest);
  }

  setLoginDataToLocalStorage(data: any) {
    localStorage.setItem('token', JSON.stringify(data.accessToken));
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  removeLoginDataToLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isUserLoggedIn(){
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    api: string = "http://127.0.0.1:8000/api/login/";

  constructor(private http:HttpClient) {

  }

  login(producto: any)
  {
    return this.http.post(this.api, producto);
  }
}
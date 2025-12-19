import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    //api: string = "http://localhost:8000/api/login"; //Lumen 8
    api: string = "http://127.0.0.1:8000/api/login/"; //Laravel 12

  constructor(private http:HttpClient) {

  }

  login(usuarios: any)
  {
    return this.http.post(this.api, usuarios);
  }
}
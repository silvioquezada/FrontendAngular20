import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
    api: string = "http://127.0.0.1:8000/api/productos/";

  constructor(private http:HttpClient) {

  }

  listar()
  {
    return this.http.get(this.api);
  }

  guardar(producto: any)
  {
    return this.http.post(this.api, producto);
  }

  actualizar(producto: any, codigo: string)
  {
    return this.http.put(this.api + codigo, producto);
  }
}
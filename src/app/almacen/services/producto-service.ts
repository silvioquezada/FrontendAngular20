import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
    api: string = "http://localhost:8000/api/productos"; //Lumen 8
    //api: string = "http://127.0.0.1:8000/api/productos/"; //Laravel 12

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

  actualizar(producto: any, id: number)
  {
    return this.http.put(this.api + id, producto);
  }

  eliminar(id: number)
  {
    return this.http.delete(this.api + id);
  }
}
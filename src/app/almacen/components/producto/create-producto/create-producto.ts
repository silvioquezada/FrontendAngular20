import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto-service';
declare var bootstrap: any;

@Component({
  selector: 'app-create-producto',
  imports: [FormsModule],
  templateUrl: './create-producto.html',
  styleUrl: './create-producto.css',
})
export class CreateProducto {
  datosenvio = output<any>();

  id: number = 0;
  codigo: string = "";
  descripcion: string = "";
  stock: number = 0;
  precio: number = 0;
  iva: number = 0;

  modal!: any;

  constructor(private productoservice: ProductoService){}

  ngAfterViewInit() {
  this.modal = new bootstrap.Modal(
    document.getElementById('modalRegistroProducto')
  );
}

  guardar(): void
  {
    const producto = {
      'codigo': this.codigo,
      'descripcion': this.descripcion,
      'stock': this.stock,
      'precio': this.precio,
      'iva': this.iva,
    }

    this.productoservice.guardar(producto).subscribe( (data: any) =>
    {
      if(data.estado==2)
      {
        alert("Error al almacenar el registro");
      }
      else
      {
        alert("Ok");
        this.datosenvio.emit("ok");
        this.modal.hide();
        }
    });
  }

  buscarProducto(item: any): void
  {
    this.id = item.id;
    this.codigo = item.codigo;
    this.descripcion = item.descripcion;
    this.stock = item.stock;
    this.precio = item.precio;
    this.iva = item.iva;
    this.modal.show();
  }

  actualizar(): void
  {
    const producto = {
      'codigo': this.codigo,
      'descripcion': this.descripcion,
      'stock': this.stock,
      'precio': this.precio,
      'iva': this.iva,
    }

    this.productoservice.actualizar(producto, this.codigo).subscribe( (data: any) =>
    {
      if(data.estado==2)
      {
        alert("Error al almacenar el registro");
      }
      else
      {
        alert("Ok");
        this.datosenvio.emit("ok");
        this.modal.hide();
        }
    });
  }

}

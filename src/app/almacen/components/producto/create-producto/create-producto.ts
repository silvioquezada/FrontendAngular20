import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto-service';
declare var bootstrap: any;
import Swal from 'sweetalert2';
import { ErrorService } from '../../../../shared/services/error-service';

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

  constructor(private productoservice: ProductoService, private error:ErrorService){}

  ngAfterViewInit() {
  this.modal = new bootstrap.Modal(
    document.getElementById('modalRegistroProducto')
  );
}

  guardar(): void
  {
    //this.iniciarLoader();
    const producto = {
      'codigo': this.codigo,
      'descripcion': this.descripcion,
      'stock': this.stock,
      'precio': this.precio,
      'iva': this.iva,
    }

    /*
    this.productoservice.guardar(producto).subscribe( (data: any) =>
    {
      Swal.close();
      if(data.estado==1)
      {
        Swal.fire({
          title: "Información",
          text: "Almacenado correctamente",
          icon: "success"
        });
        this.datosenvio.emit("ok");
        this.modal.hide();
      }
      else
      {
        Swal.fire({
          title: "Información",
          text: "Se a originado un error: " + data.mensaje,
          icon: "error"
        }); 
      }
    });
    */

    this.productoservice.guardar(producto).subscribe( (data : any) =>
    {
        Swal.close();
        

        if (data.estado == true)
        {
          Swal.fire({
            title: "Información",
            text: "Almacenado correctamente",
            icon: "success"
          });
          this.datosenvio.emit("ok");
          this.modal.hide();
        }
        else
        {
          Swal.fire({
            title: "Información",
            text: "Se a originado un error: " + data.mensaje,
            icon: "error"
          });
        }
      }, err => {
        Swal.fire({
            title: "Información",
            text: "Se a originado un error: " + this.error.getClienteStatus(err.status),
            icon: "error"
          });
        
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
    this.iniciarLoader();
    const producto = {
      'codigo': this.codigo,
      'descripcion': this.descripcion,
      'stock': this.stock,
      'precio': this.precio,
      'iva': this.iva,
    }
    this.productoservice.actualizar(producto, this.id).subscribe( (data: any) =>
    {
      Swal.close();
      if(data.estado==1)
      {
        Swal.fire({
          title: "Información",
          text: "Actualizado correctamente",
          icon: "success"
        });
        this.datosenvio.emit("ok");
        this.modal.hide();
      }
      else
      {
        Swal.fire({
          title: "Información",
          text: "Se a originado un error",
          icon: "error"
        });
        
      }
    });
  }

  iniciarLoader()
  {
    Swal.fire({
    title: 'Cargando...',
    html: 'Por favor espere mientras procesamos su solicitud.',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
          Swal.showLoading(); 
      }
    });
  }

}

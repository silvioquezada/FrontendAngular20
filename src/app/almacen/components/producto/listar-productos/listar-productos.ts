import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ProductoService } from '../../../services/producto-service';
import { CommonModule } from '@angular/common';
import { CreateProducto } from '../create-producto/create-producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule, CreateProducto],
  templateUrl: './listar-productos.html',
  styleUrl: './listar-productos.css',
})
export class ListarProductos {
  @ViewChild(CreateProducto) createProducto!: CreateProducto;
  productos: any = [];

  constructor(private productoservice: ProductoService, private cdr: ChangeDetectorRef) { }

 
  ngOnInit(): void {
   this.listar();
  }

  listar(): void
  {
    this.iniciarLoader();
    this.productoservice.listar().subscribe( (data : any) =>
    {
      Swal.close();
      this.productos = data;
      this.cdr.detectChanges();
    }, err => {
      console.log("Error");
    });
  }

  recibirDatosGuardar(datos: any): void
  {
    this.listar();
  }

  editarProducto(item: any): void
  {
    this.createProducto.buscarProducto(item);
  }

  eliminarProducto(id: number): void
  {
    Swal.fire({
      title: '¿Estás seguro de Eliminar el registro?',
      text: '¡No podrás revertir esto después de la eliminación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {       
        this.eliminar(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'La operación de eliminación ha sido cancelada.',
          'error'
        )
      }
    })
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

  eliminar(id: number): void
  {
    this.iniciarLoader();
    this.productoservice.eliminar(id).subscribe( (data: any) =>
    {
      Swal.close();
      if(data.estado==1)
      {
        Swal.fire({
          title: "Información",
          text: "Eliminado correctamente",
          icon: "success"
        });
        this.listar();
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

}

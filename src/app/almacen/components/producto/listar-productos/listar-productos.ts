import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ProductoService } from '../../../services/producto-service';
import { CommonModule } from '@angular/common';
import { CreateProducto } from '../create-producto/create-producto';


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
    this.productoservice.listar().subscribe( (data : any) =>
    {
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

  eliminarProducto(codigo: any): void
  {

  }

  agregar(): void
  {
    //$("#modalformulariosocio").modal("show");
  }

}

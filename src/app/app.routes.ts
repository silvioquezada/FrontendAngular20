import { Routes } from '@angular/router';
import { Dashboard } from './shared/components/dashboard/dashboard';
import { ListarProductos } from './almacen/components/producto/listar-productos/listar-productos';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'productos', component: ListarProductos },
];

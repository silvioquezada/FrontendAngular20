import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Login } from './administrar/components/usuario/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontendAngular20');

  logueado: number = 0;

  isSidebarCollapsed = false;

  ngOnInit(): void {
   const estadovalor = localStorage.getItem("logueado");
   if(estadovalor=="1")
   {
    this.logueado=1;
   }
   else
    {
      this.logueado=0;
    }
  }

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  recibirEstadoLogin(estado: number)
  {
    if(estado==1)
    {
      this.logueado=1;
    }
  }

}

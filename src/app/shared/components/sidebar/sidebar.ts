import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
  isOpen?: boolean;
  action?: () => void
}


@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink
    //RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      route: '/'
    },
    {
      icon: 'fas fa-cog',
      label: 'Configuración',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'Perfil',  route: '/productos'},
        { icon: 'fas fa-lock', label: 'Contraseña' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Productos',
      route: '/productos'
    },
    {
      icon: 'fas fa-envelope',
      label: 'Cerrar Sesión',
      route: undefined,
      action: () => this.logout()
    }
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }

  logout()
  {
    localStorage.setItem("logueado", "0");
    window.location.reload();
  }

  handleMenuItemClick(item: MenuItem)
  {
    if(item.action)
    {
      item.action();
    }
  }

}

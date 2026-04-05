import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();

  // 📌 MENÚ CON RUTAS CORRECTAS
  menuItems = [
    { path: '/dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard' },
    { path: '/hogares', icon: 'bi bi-house-door-fill', label: 'Hogares' },
    { path: '/profile', icon: 'bi bi-person-circle', label: 'Mi Perfil' },
    { path: '/settings', icon: 'bi bi-gear-fill', label: 'Configuración' },
    { path: '/about', icon: 'bi bi-info-circle-fill', label: 'Acerca de' },
    { path: '/services', icon: 'bi bi-gear-fill', label: 'Servicios' },
    { path: '/contact', icon: 'bi bi-envelope-fill', label: 'Contacto' }
  ];

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  get usuarioActual(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  close() {
    this.closeSidebar.emit();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.close();
  }

  logout() {
    localStorage.removeItem('usuario');
    this.close();
    this.router.navigate(['/login']);
  }
}
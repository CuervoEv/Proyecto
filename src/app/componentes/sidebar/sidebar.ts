import { Component, Output, EventEmitter, Input } from '@angular/core';
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

  menuItems = [
    { path: '/dashboard', icon: 'bi bi-speedometer2', label: 'Dashboard', roles: ['admin', 'user'] },
    { path: '/list', icon: 'bi bi-house-door-fill', label: 'Hogares', roles: ['admin', 'user'] },
    { path: '/profile', icon: 'bi bi-person-circle', label: 'Mi Perfil', roles: ['admin', 'user'] },
    { path: '/settings', icon: 'bi bi-gear-fill', label: 'Configuración', roles: ['admin'] },
    { path: '/about', icon: 'bi bi-info-circle-fill', label: 'Acerca de', roles: ['admin', 'user'] },
    { path: '/services', icon: 'bi bi-gear-fill', label: 'Servicios', roles: ['admin', 'user'] },
    { path: '/contact', icon: 'bi bi-envelope-fill', label: 'Contacto', roles: ['admin', 'user'] }
  ];

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  get usuarioActual(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  shouldShowMenuItem(item: any): boolean {
    if (!this.isLoggedIn) return false;
    // Por ahora muestra todos, luego puedes filtrar por rol
    return true;
  }

  close() {
    this.closeSidebar.emit();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.close(); // Cierra sidebar después de navegar
  }

  logout() {
    localStorage.removeItem('usuario');
    this.close();
    this.router.navigate(['/login']);
  }
}
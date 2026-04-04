import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  logout() {
    // Limpiar localStorage o sesión
    localStorage.removeItem('usuario');
    
    // Redirigir al login
    this.router.navigate(['/login']);
    
    // Opcional: mostrar mensaje
    alert('Sesión cerrada correctamente');
  }
}
import { Component, Output, EventEmitter } from '@angular/core';  
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

  @Output() toggleSidebar = new EventEmitter<void>();  // 👈 AÑADE ESTO

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();  // 👈 EMITE EL EVENTO
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    alert('Sesión cerrada correctamente');
  }
}
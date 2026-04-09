import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Footer } from './componentes/footer/footer';
import { SidebarComponent } from './componentes/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, SidebarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto');
  
  sidebarOpen: boolean = false;
  showFooter: boolean = true;  // Footer visible solo en login/register

  constructor(private router: Router) {
    // Escuchar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verificarRuta();
      }
    });
  }

  ngOnInit() {
    this.verificarRuta();
  }

  verificarRuta() {
    // Obtener la ruta actual
    const currentUrl = this.router.url;
    
    // Rutas donde DEBE aparecer el footer (solo login y register)
    const rutasConFooter = ['/login', '/register'];
    
    // Verificar si la ruta actual es login o register
    const esRutaConFooter = rutasConFooter.includes(currentUrl);
    
    // También verificar si hay usuario logueado
    const isLoggedIn = !!localStorage.getItem('usuario');
    
    // Mostrar footer SOLO en login/register Y que NO esté logueado
    this.showFooter = esRutaConFooter && !isLoggedIn;
    
    console.log('showFooter:', this.showFooter, 'ruta:', currentUrl, 'logueado:', isLoggedIn);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  // Método para actualizar después de login/register
  actualizarEstado() {
    this.verificarRuta();
    this.sidebarOpen = false;
  }
}

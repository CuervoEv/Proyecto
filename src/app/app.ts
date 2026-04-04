import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header';
import { Footer } from './componentes/footer/footer';
import { SidebarComponent } from './componentes/sidebar/sidebar';  // 👈 Importar Sidebar

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer, SidebarComponent],  // 👈 Añadir Sidebar
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto');
  
  // 👈 Estado del sidebar
  sidebarOpen: boolean = false;

  // 👈 Método para alternar sidebar (recibido del header)
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // 👈 Método para cerrar sidebar
  closeSidebar() {
    this.sidebarOpen = false;
  }
}
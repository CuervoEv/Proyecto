import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header';
import { Footer } from './componentes/footer/footer';
import { SidebarComponent } from './componentes/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto');
  
  sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  ngOnInit() {
  // Cargar fuente guardada al iniciar la app
  const savedFontSize = localStorage.getItem('appFontSize');
  if (savedFontSize) {
    document.body.style.fontSize = savedFontSize;
  }
}
}

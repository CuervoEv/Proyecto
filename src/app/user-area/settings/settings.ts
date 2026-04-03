import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent {

  configuracion = {
    tema: 'claro',
    notificaciones: true,
    idioma: 'es'
  };
ngOnInit() {
  const data = localStorage.getItem('config');

  if (data) {
    this.configuracion = JSON.parse(data);

    // 🔥 aplicar tema al cargar
    document.body.className = this.configuracion.tema;
  }
}

guardar() {
  localStorage.setItem('config', JSON.stringify(this.configuracion));

  document.body.className = this.configuracion.tema;

  alert('Configuración guardada ⚙️');
}
}
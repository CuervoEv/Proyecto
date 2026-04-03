import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css']
})
export class RecoverPasswordComponent {

  correo: string = '';

  recuperar() {
    if (!this.correo.trim()) {
      alert('Por favor ingresa tu correo');
      return;
    }

    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      alert('No hay usuarios registrados');
      return;
    }

    const data = JSON.parse(usuario);

    if (data.correo === this.correo) {
      alert('Se ha enviado un enlace de recuperación 📩');
    } else {
      alert('Correo no encontrado ❌');
    }
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css']
})
export class RecoverComponent {

  correo: string = '';

  constructor(private router: Router) {}

  recuperar() {
    // Validación del correo
    if (!this.correo.trim()) {
      alert('Por favor ingresa tu correo electrónico');
      return;
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }

    // Aquí iría la lógica para enviar el correo de recuperación
    // Por ahora simulamos el envío
    console.log('Enviando correo de recuperación a:', this.correo);
    
    // Guardar en localStorage para simular
    const solicitudRecuperacion = {
      email: this.correo,
      fecha: new Date().toISOString()
    };
    localStorage.setItem('recuperacion', JSON.stringify(solicitudRecuperacion));
    
    // Mostrar mensaje de éxito
    alert(`Se ha enviado un enlace de recuperación a ${this.correo}`);
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
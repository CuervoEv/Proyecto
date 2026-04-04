import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';  // Añadida la variable para la contraseña

  constructor(private router: Router) {}

  entrar() {
    // Validación de usuario
    if (!this.usuario.trim()) {
      alert('Por favor escribe tu usuario');
      return;
    }
    
    // Validación de contraseña
    if (!this.contrasena.trim()) {
      alert('Por favor escribe tu contraseña');
      return;
    }
    
    // Aquí iría la lógica de autenticación con un backend
    // Por ahora es una simulación
    const datosUsuario = {
      usuario: this.usuario,
      contrasena: this.contrasena,  // En un caso real, no guardes la contraseña así
      fechaLogin: new Date().toISOString()
    };
    
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    
    // Redirige al dashboard o página principal
    this.router.navigate(['/dashboard']);
  }
}
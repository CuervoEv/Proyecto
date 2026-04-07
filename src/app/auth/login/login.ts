import { Component, inject } from '@angular/core';
import { LoginService } from '../../servicesAPI/login/login-service';
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
  private loginService = inject(LoginService);
  
  correo: string = '';
  contrasena: string = '';

  constructor(private router: Router) {}

  ingresar() {
    // Validaciones
    if (!this.correo.trim()) {
      alert('Por favor escribe tu correo electrónico');
      return;
    }
    if (!this.contrasena.trim()) {
      alert('Por favor escribe tu contraseña');
      return;
    }
    
    // Preparar datos para enviar al backend
    const credenciales = {
      username: this.correo,  // OAuth2 espera "username"
      password: this.contrasena
    };
    
    // Enviar al backend
    this.loginService.login(credenciales).subscribe({
      next: (respuesta) => {
        console.log('Login exitoso', respuesta);
        // Guardar tokens en localStorage
        localStorage.setItem('access_token', respuesta.access_token);
        localStorage.setItem('refresh_token', respuesta.refresh_token);
        alert('Bienvenido');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        if (error.status === 401) {
          alert('Correo o contraseña incorrectos');
        } else {
          alert('Error al iniciar sesión. Intenta de nuevo');
        }
      }
    });
  }
}
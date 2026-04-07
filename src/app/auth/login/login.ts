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
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router) {}

  ingresar() {
    // Validaciones
    if (!this.correo.trim()) {
      this.error = 'Por favor escribe tu correo electrónico';
      return;
    }
    if (!this.contrasena.trim()) {
      this.error = 'Por favor escribe tu contraseña';
      return;
    }

    this.loading = true;
    this.error = '';
    
    // Preparar datos para enviar al backend
    const credenciales = {
      username: this.correo,
      password: this.contrasena
    };
    
    // Enviar al backend real
    this.loginService.login(credenciales).subscribe({
      next: (respuesta) => {
        console.log('Login exitoso', respuesta);
        // Guardar tokens en localStorage
        localStorage.setItem('access_token', respuesta.access_token);
        localStorage.setItem('refresh_token', respuesta.refresh_token);
        
        // Guardar información del usuario
        const usuarioData = {
          correo: this.correo,
          nombre: this.correo.split('@')[0] // Temporal, después vendrá del backend
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        
        this.loading = false;
        alert('Bienvenido');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        this.loading = false;
        if (error.status === 401) {
          this.error = 'Correo o contraseña incorrectos';
        } else {
          this.error = 'Error al iniciar sesión. Intenta de nuevo';
        }
      }
    });
  }
}
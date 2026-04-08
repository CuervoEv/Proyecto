import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicesAPI/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  entrar() {
    // Validaciones
    if (!this.usuario.trim()) {
      this.error = 'Por favor escribe tu usuario';
      return;
    }

    if (!this.contrasena.trim()) {
      this.error = 'Por favor escribe tu contraseña';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (response: any) => {
        console.log('Login exitoso', response);
        
        // Guardar usuario en localStorage
        const usuarioData = {
          usuario: this.usuario,
          token: response.token,
          id: response.id,
          rol: response.rol
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        
        // Actualizar el componente principal para que oculte el footer
        this.actualizarEstadoApp();
        
        // Redirigir al dashboard o mis-hogares
        this.router.navigate(['/mis-hogares']);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.mensaje || 'Usuario o contraseña incorrectos';
        console.error('Error en login:', err);
      }
    });
  }

  // Método para actualizar el estado del footer en el componente principal
  actualizarEstadoApp() {
    // Buscar el componente app-root
    const appRoot = document.querySelector('app-root');
    if (appRoot && (appRoot as any).componentInstance) {
      const appComponent = (appRoot as any).componentInstance;
      if (appComponent.actualizarEstado) {
        appComponent.actualizarEstado();
      }
    }
  }
}
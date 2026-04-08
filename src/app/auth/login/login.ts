import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '../../servicesAPI/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  login() {
    // Validaciones
    if (!this.usuario.trim()) {
      this.error = '⚠ Por favor ingresa tu usuario';
      return;
    }
    
    if (!this.contrasena.trim()) {
      this.error = '⚠ Por favor ingresa tu contraseña';
      return;
    }

    this.loading = true;
    this.error = '';

    // 🔥 LLAMADA CORRECTA: parámetros separados
    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (response: any) => {
        console.log('✅ Login exitoso:', response);
        
        // Guardar datos del usuario
        const usuarioData = {
          id: response.id || 1,
          usuario: response.usuario || this.usuario,
          nombre: response.nombre || response.usuario || this.usuario,
          email: response.email || '',
          token: response.token || 'fake-token',
          rol: response.rol || 'miembro'
        };
        
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        
        // Disparar evento para actualizar el footer
        this.actualizarEstadoApp();
        
        // Redirigir después del login
        this.router.navigate(['/mis-hogares']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('❌ Error en login:', err);
        
        // Manejo de errores
        const mensajeError = err.error?.mensaje || err.error?.error || err.message;
        
        if (mensajeError?.includes('usuario') || mensajeError?.includes('Usuario')) {
          this.error = '⚠ Usuario no encontrado';
        } else if (mensajeError?.includes('contraseña') || mensajeError?.includes('Contraseña')) {
          this.error = '⚠ Contraseña incorrecta';
        } else {
          this.error = '⚠ Error al iniciar sesión. Intenta de nuevo.';
        }
      }
    });
  }

  actualizarEstadoApp() {
    // Método 1: Evento personalizado
    const evento = new CustomEvent('authChange', { 
      detail: { isLoggedIn: true } 
    });
    this.document.dispatchEvent(evento);
    
    // Método 2: Buscar componente app-root y llamar método
    setTimeout(() => {
      const appRoot = document.querySelector('app-root');
      if (appRoot && (appRoot as any).componentInstance) {
        const appComponent = (appRoot as any).componentInstance;
        if (appComponent.actualizarEstado) {
          appComponent.actualizarEstado();
        }
      }
    }, 100);
  }
}
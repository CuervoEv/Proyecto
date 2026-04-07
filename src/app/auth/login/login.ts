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
  
  // 🔥 CAMBIO: para que coincida con HTML
  usuario: string = '';
  contrasena: string = '';

  // 🔥 PARA EL HTML
  loading: boolean = false;
  error: string = '';

  // 🔁 MODO FAKE
  usarBackend: boolean = false;

  constructor(private router: Router) {}

  // 🔥 CAMBIO: ahora se llama como tu HTML
  entrar() {

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

    // 🟡 MODO FAKE
    if (!this.usarBackend) {
      setTimeout(() => {

        const usuarioFake = {
          nombre: this.usuario,
          correo: this.usuario + '@fake.com'
        };

        localStorage.setItem('usuario', JSON.stringify(usuarioFake));
        localStorage.setItem('token', 'fake-token');

        this.loading = false;
        this.router.navigate(['/dashboard']);

      }, 800);

      return;
    }

    // 🔵 MODO REAL (cuando actives backend)
    const credenciales = {
      username: this.usuario,
      password: this.contrasena
    };

    this.loginService.login(credenciales).subscribe({
      next: (respuesta: any) => {
        localStorage.setItem('access_token', respuesta.access_token);
        localStorage.setItem('refresh_token', respuesta.refresh_token);

        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.loading = false;
        this.error = 'Usuario o contraseña incorrectos';
        console.error(error);
      }
    });
  }
}
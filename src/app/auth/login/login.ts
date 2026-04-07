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
  contrasena: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router) {}

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

    // 🎭 LOGIN FAKE
    setTimeout(() => {

      const usuarioFake = {
        nombre: this.usuario,
        correo: this.usuario + '@fake.com'
      };

      // 💾 Guardar sesión
      localStorage.setItem('usuario', JSON.stringify(usuarioFake));
      localStorage.setItem('token', 'fake-token-123');

      this.loading = false;

      // 🚀 Redirigir
      this.router.navigate(['/dashboard']);

    }, 800); // simula carga real
  }
}
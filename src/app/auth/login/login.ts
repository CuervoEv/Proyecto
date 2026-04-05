import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicesAPI/auth.service';

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
  cargando: boolean = false;


  constructor(private router: Router, private authService: AuthService) {}

  entrar() {
    if (!this.usuario.trim()) {
      alert('Por favor escribe tu usuario');
      return;
    }
    if (!this.contrasena.trim()) {
      alert('Por favor escribe tu contraseña');
      return;
    }
    this.cargando = true;
    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (resp) => {
        this.cargando = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.cargando = false;
        alert('Error de autenticación: ' + (err.error?.detail || 'Verifica tus credenciales'));
      }
    });
  }
}
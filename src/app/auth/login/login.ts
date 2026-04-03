import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  nombre: string = '';

  constructor(private router: Router) {}

  entrar() {
    if (!this.nombre.trim()) {
      alert('Por favor escribe tu nombre');
    } else {

      const usuario = {
        nombre: this.nombre
      };

      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.router.navigate(['/dashboard']);
    }
  }
}
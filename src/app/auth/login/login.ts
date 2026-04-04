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

  constructor(private router: Router) {}

  entrar() {

    if (!this.usuario.trim()) {
      alert('Por favor escribe tu usuario');
      return;
    }
    

    if (!this.contrasena.trim()) {
      alert('Por favor escribe tu contraseña');
      return;
    }
    
    const datosUsuario = {
      usuario: this.usuario,
      contrasena: this.contrasena, 
      fechaLogin: new Date().toISOString()
    };
    
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));

    this.router.navigate(['/dashboard']);
  }
}
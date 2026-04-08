import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  nombre: string = '';
  segundoNombre: string = '';
  apellido: string = '';
  segundoApellido: string = '';
  usuario: string = '';
  email: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  obtenerNombreCompleto(): string {
    let nombreCompleto = this.nombre;
    
    return nombreCompleto;
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  registrar() {
    this.error = '';
    
    if (!this.usuario.trim()) {
      this.error = 'Por favor escribe tu usuario';
      return;
    }

    if (!this.email.trim()) {
      this.error = 'Por favor escribe tu email';
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor escribe un email válido';
      return;
    }

    if (!this.contrasena.trim()) {
      this.error = 'Por favor escribe tu contraseña';
      return;
    }

    if (this.contrasena.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    
    this.loading = true;

    setTimeout(() => {
      const datosUsuario = {
        id: Date.now(),
        nombre: this.nombre,
        segundoNombre: this.segundoNombre,
        apellido: this.apellido,
        segundoApellido: this.segundoApellido,
        nombreCompleto: this.obtenerNombreCompleto(),
        usuario: this.usuario,
        email: this.email,
        rol: 'miembro',
        fechaRegistro: new Date().toISOString()
      };
      
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      this.dispararEventoAuth();
      this.loading = false;
      this.router.navigate(['/mis-hogares']);
    }, 1500);
  }

  dispararEventoAuth() {
    const evento = new CustomEvent('authChange', { 
      detail: { isLoggedIn: true } 
    });
    this.document.dispatchEvent(evento);
  }
}
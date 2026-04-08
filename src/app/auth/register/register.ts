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

  // Campos del formulario
  nombre: string = '';
  segundoNombre: string = '';
  apellido: string = '';
  segundoApellido: string = '';
  usuario: string = '';
  email: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  
  // Estados
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // Obtener nombre completo
  obtenerNombreCompleto(): string {
    let nombreCompleto = this.nombre;
    
    if (this.segundoNombre) {
      nombreCompleto += ' ' + this.segundoNombre;
    }
    if (this.apellido) {
      nombreCompleto += ' ' + this.apellido;
    }
    if (this.segundoApellido) {
      nombreCompleto += ' ' + this.segundoApellido;
    }
    
    return nombreCompleto;
  }

  // Validar email
  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Registrar usuario
  registrar() {
    // Limpiar error previo
    this.error = '';

    // Validaciones
    if (!this.nombre.trim()) {
      this.error = 'Por favor escribe tu nombre';
      return;
    }
    
    if (!this.apellido.trim()) {
      this.error = 'Por favor escribe tu apellido';
      return;
    }
    
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

    // Simular registro (aquí iría la llamada a tu API)
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
      
      // Guardar en localStorage
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      
      // Disparar evento personalizado para actualizar el footer
      this.dispararEventoAuth();
      
      this.loading = false;
      
      // Redirigir a mis hogares
      this.router.navigate(['/mis-hogares']);
    }, 1500);
  }

  // Disparar evento para actualizar el estado en app.component
  dispararEventoAuth() {
    const evento = new CustomEvent('authChange', { 
      detail: { isLoggedIn: true } 
    });
    this.document.dispatchEvent(evento);
  }
}
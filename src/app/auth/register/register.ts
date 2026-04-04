import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  // Datos personales
  nombre: string = '';
  segundoNombre: string = '';
  apellido: string = '';
  segundoApellido: string = '';
  usuario: string = '';

  constructor(private router: Router) {}

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

  entrar() {
    // Validaciones
    if (!this.nombre.trim()) {
      alert('Por favor escribe tu nombre');
      return;
    }
    
    if (!this.apellido.trim()) {
      alert('Por favor escribe tu apellido');
      return;
    }
    
    if (!this.usuario.trim()) {
      alert('Por favor escribe tu usuario');
      return;
    }
    
    const datosUsuario = {
      nombre: this.nombre,
      segundoNombre: this.segundoNombre,
      apellido: this.apellido,
      segundoApellido: this.segundoApellido,
      nombreCompleto: this.obtenerNombreCompleto(),
      usuario: this.usuario
    };
    
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    
    // Redirige al dashboard
    this.router.navigate(['/dashboard']);
  }
}
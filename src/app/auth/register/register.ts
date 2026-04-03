import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  nombre: string = '';
  correo: string = '';
  password: string = '';
  telefono: string = '';
  rol: string = '';

  constructor(private router: Router) {}

  registrar() {
    if (!this.nombre || !this.correo || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    const usuario = {
    nombre: this.nombre,
    correo: this.correo,
    telefono: this.telefono,
    rol: this.rol,
    fechaCreacion: new Date().toLocaleDateString()
  };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    alert('Usuario registrado correctamente 🚀');


    this.router.navigate(['/dashboard']);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {

  usuario: any = {
  nombre: '',
  correo: '',
  telefono: '',
  rol: '',
  fechaCreacion: ''
};

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('usuario');

    if (!data) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = JSON.parse(data);
  }

  guardar() {
    if (!this.usuario.nombre || !this.usuario.correo) {
      alert('Completa todos los campos');
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(this.usuario));

    alert('Datos actualizados ✨');
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
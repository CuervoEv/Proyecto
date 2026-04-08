import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Miembro {
  nombre: string;
  rol: 'Administrador' | 'Miembro';
  pin: string;
}

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './members.html',
  styleUrls: ['./members.css']
})
export class MembersComponent implements OnInit {

  miembros: Miembro[] = [];
  nuevoNombre: string = '';
  nuevoPin: string = '';
  error: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ Solo cargamos miembros creados en esta sección
    const guardados = localStorage.getItem('miembros');
    if (guardados) {
      this.miembros = JSON.parse(guardados);
    } else {
      this.miembros = [];
    }
  }

  crearMiembro() {
    // ✅ Máximo 6 miembros
    if (this.miembros.length >= 6) {
      this.error = '⚠ Límite de 6 miembros alcanzado';
      return;
    }

    // ✅ Validación de campos
    if (!this.nuevoNombre.trim() || !this.nuevoPin.trim()) {
      this.error = '⚠ Ingresa nombre y PIN';
      return;
    }

    // ✅ Primer miembro = Administrador, los demás = Miembro
    const rol = this.miembros.length === 0 ? 'Administrador' : 'Miembro';
    const miembro: Miembro = {
      nombre: this.nuevoNombre,
      rol,
      pin: this.nuevoPin
    };

    // ✅ Guardamos en localStorage
    this.miembros.push(miembro);
    localStorage.setItem('miembros', JSON.stringify(this.miembros));

    // ✅ Limpiamos campos y errores
    this.nuevoNombre = '';
    this.nuevoPin = '';
    this.error = '';
  }

  ingresar(miembro: Miembro, pinIngresado: string) {
    // ✅ Validación de PIN
    if (pinIngresado === miembro.pin) {
      this.router.navigate(['/mis-hogares'], { queryParams: { miembro: miembro.nombre, rol: miembro.rol } });
    } else {
      this.error = '⚠ PIN incorrecto';
    }
  }
}

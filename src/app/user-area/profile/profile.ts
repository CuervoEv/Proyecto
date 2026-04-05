import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  
  usuario: any = {
    id: '',
    nombre: '',
    segundoNombre: '',
    apellido: '',
    segundoApellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaRegistro: '',
    rol: ''
  };
  
  editMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (usuarioGuardado) {
      const datos = JSON.parse(usuarioGuardado);
      this.usuario = {
        id: '1',
        nombre: datos.usuario || 'Juan',
        segundoNombre: 'Carlos',
        apellido: 'Pérez',
        segundoApellido: 'González',
        email: `${datos.usuario || 'usuario'}@ejemplo.com`,
        telefono: '+34 123 456 789',
        direccion: 'Calle Principal 123, Ciudad',
        fechaRegistro: new Date().toLocaleDateString(),
        rol: 'Usuario'
      };
    } else {
      this.usuario = {
        id: '1',
        nombre: 'Juan',
        segundoNombre: 'Carlos',
        apellido: 'Pérez',
        segundoApellido: 'González',
        email: 'juan.perez@ejemplo.com',
        telefono: '+34 123 456 789',
        direccion: 'Calle Principal 123, Ciudad',
        fechaRegistro: new Date().toLocaleDateString(),
        rol: 'Usuario'
      };
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  guardarCambios() {
    alert('✅ Perfil actualizado correctamente');
    this.editMode = false;
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cancelarEdicion() {
    this.editMode = false;
    this.cargarDatosUsuario();
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }

  cambiarContrasena() {
    alert('🔐 Funcionalidad: Cambiar contraseña');
  }

  verDetalles() {
    alert('📊 Ver estadísticas detalladas');
  }

  abrirConfiguracion() {
    this.router.navigate(['/settings']);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
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
  cargando: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    // Por ahora carga datos simulados
    // DESPUÉS: this.apiService.get('/usuarios/perfil').subscribe()
    
    setTimeout(() => {
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
      this.cargando = false;
    }, 500);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  guardarCambios() {
    this.cargando = true;
    
    // DESPUÉS: this.apiService.put('/usuarios/perfil', this.usuario).subscribe()
    
    setTimeout(() => {
      alert('✅ Perfil actualizado correctamente');
      this.editMode = false;
      this.cargando = false;
      
      // Actualizar localStorage
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
    }, 500);
  }

  cancelarEdicion() {
    this.editMode = false;
    this.cargarDatosUsuario(); // Recargar datos originales
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    alert('Sesión cerrada correctamente');
  }
}
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

  usuario: string = '';  // Cambiado de 'nombre' a 'usuario'
  rolSeleccionado: string = '';

  constructor(private router: Router) {}

  seleccionarRol(rol: string) {
    this.rolSeleccionado = rol;
  }

  obtenerNombreRol(): string {
    const roles: {[key: string]: string} = {
      'padre': 'Administrador',
      'hijo': 'Miembro', 
      'familiar': 'Colaborador'
    };
    return roles[this.rolSeleccionado] || '';
  }

  entrar() {
    // Validación para usuario (no nombre)
    if (!this.usuario.trim()) {
      alert('Por favor escribe tu usuario');
      return;
    }
    
    if (!this.rolSeleccionado) {
      alert('Por favor selecciona un rol');
      return;
    }
    
    const datosUsuario = {
      usuario: this.usuario,  // Cambiado de 'nombre' a 'usuario'
      rol: this.rolSeleccionado
    };
    
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    
    // Redirige según el rol
    switch(this.rolSeleccionado) {
      case 'padre':
        this.router.navigate(['/admin']);
        break;
      case 'hijo':
        this.router.navigate(['/miembro']);
        break;
      case 'familiar':
        this.router.navigate(['/colaborador']);
        break;
    }
  }

  continuarConRol() {
    this.entrar();
  }
}
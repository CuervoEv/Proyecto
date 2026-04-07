import { Component, inject, signal} from '@angular/core';
import { RegisterService } from '../../servicesAPI/register/register-service';
import { RegisterData } from '../../models/register-interface';
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
  private registerService = inject(RegisterService);
  
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';

  // NUEVO 
  usuarioGuardado: any = null;

  constructor(private router: Router) {}

  entrar() {
    // Validaciones
    if (!this.nombre.trim()) {
      alert('Por favor escribe tu nombre');
      return;
    }
    if (!this.correo.trim()) {
      alert('Por favor escribe tu correo electrónico');
      return;
    }
    if (!this.contrasena.trim()) {
      alert('Por favor escribe tu contraseña');
      return;
    }
    
    // Enviar al backend
    const datosUsuario: RegisterData = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena
    };
    
    // Enviar al backend
    this.registerService.register(datosUsuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado con éxito', respuesta);

        // NUEVO: guardar usuario 
        localStorage.setItem('usuario', JSON.stringify(respuesta));
        this.usuarioGuardado = respuesta;

        alert('Registro exitoso');

        // REDIRECCIÓN 
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al registrar', error);
        if (error.status === 400) {
          alert('El correo ya está registrado');
        } else {
          alert('Error al registrar usuario. Intenta de nuevo');
        }
      }
    });
  }
  obtenerUsuario() {
    return JSON.parse(localStorage.getItem('usuario')!);
  }
}
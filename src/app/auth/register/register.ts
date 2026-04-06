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
    
    // Preparar datos para enviar al backend
    const datosUsuario: RegisterData = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena
    };
    
    // Enviar al backend
    this.registerService.register(datosUsuario).subscribe({
      next: (respuesta) => {
        // Si el registro es exitoso, redirigir al dashboard
        console.log('Usuario registrado con éxito', respuesta);
        alert('Registro exitoso');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Si hay error, mostrar mensaje
        console.error('Error al registrar', error);
        if (error.status === 400) {
          alert('El correo ya está registrado');
        } else {
          alert('Error al registrar usuario. Intenta de nuevo');
        }
      }
    });
  }
}
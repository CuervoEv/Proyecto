import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../servicesAPI/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';
  loading: boolean = false;
  error: string = '';
}
//   constructor(private router: Router, private authService: AuthService) {}

//   entrar() {

//     if (!this.usuario.trim()) {
//       alert('Por favor escribe tu usuario');
//       return;
//     }

//     if (!this.contrasena.trim()) {
//       alert('Por favor escribe tu contraseña');
//       return;
//     }

//     this.loading = true;
//     this.error = '';

//     // this.authService.login(this.usuario, this.contrasena).subscribe({
//     //   next: (response: any) => {
//     //     console.log('Login exitoso', response);
//     //     this.router.navigate(['/dashboard']);
//       },
//       error: (err: any) => {
//         this.loading = false;
//         this.error = 'Usuario o contraseña incorrectos';
//         console.error('Error en login:', err);
//       }
//     });
//   }
// }
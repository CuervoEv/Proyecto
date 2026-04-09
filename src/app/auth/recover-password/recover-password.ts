import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css']
})
export class RecoverComponent {

  email: string = '';
  error: string = '';
  success: string = '';
  loading: boolean = false;
  testMode: 'success' | 'error' = 'success'; // Cambia a 'error' para probar error

  constructor(private router: Router) {}

  recoverPassword() {
    if (!this.email.trim()) {
      this.error = '⚠ Por favor ingresa tu correo electrónico';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = '⚠ Por favor ingresa un correo electrónico válido';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    setTimeout(() => {
      if (this.testMode === 'success') {
        // Éxito
        this.success = '✅ Se ha enviado un enlace de recuperación a tu correo';
        this.loading = false;
        this.email = '';
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        // Error
        this.error = '⚠ No existe una cuenta con este correo electrónico';
        this.loading = false;
      }
    }, 2000);
  }
}
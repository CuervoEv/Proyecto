import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {

  contact = {
    nombre: '',
    correo: '',
    telefono: '',
    presupuesto: '',
    mensaje: ''
  };

  ngOnInit(): void {
    const data = localStorage.getItem('contact');
    if (data) {
      this.contact = JSON.parse(data);
    }
  }

  guardar(form: any) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }

    localStorage.setItem('contact', JSON.stringify(this.contact));

    console.log("Formulario válido y guardado", this.contact);
  }
}
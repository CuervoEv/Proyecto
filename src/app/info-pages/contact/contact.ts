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
    mensaje: ''
  };

  ngOnInit(): void {
    const data = localStorage.getItem('contact');
    if (data) {
      this.contact = JSON.parse(data);
    }
  }

  guardar() {
    localStorage.setItem('contact', JSON.stringify(this.contact));
  }
}
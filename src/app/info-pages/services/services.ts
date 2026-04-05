import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services implements OnInit {

  servicios: string[] = [];
  nuevoServicio: string = '';

  ngOnInit(): void {
    const data = localStorage.getItem('services');
    if (data) {
      this.servicios = JSON.parse(data);
    }
  }

  agregarServicio() {
    if (this.nuevoServicio.trim() !== '') {
      this.servicios.push(this.nuevoServicio);
      this.nuevoServicio = '';
      this.guardar();
    }
  }

  eliminarServicio(index: number) {
    this.servicios.splice(index, 1);
    this.guardar();
  }

  guardar() {
    localStorage.setItem('services', JSON.stringify(this.servicios));
  }
}
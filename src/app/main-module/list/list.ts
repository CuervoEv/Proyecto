import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Hogar {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  color: string;
  textColor: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {

  hogares: Hogar[] = [];
  nextId: number = 2;

  // Colores pastel
  coloresPastel: string[] = [
    '#B8E0D2', '#FFD6B5', '#FFB5C2', '#C9E4DE',
    '#E8D1C5', '#D4E0F0', '#FCE1B3', '#E0D4E8'
  ];

  // Colores de texto para cada color pastel
  textColors: { [key: string]: string } = {
    '#B8E0D2': '#2c5f4e',
    '#FFD6B5': '#8b5a2b',
    '#FFB5C2': '#8b3a4a',
    '#C9E4DE': '#2c5f4e',
    '#E8D1C5': '#6b3e2a',
    '#D4E0F0': '#2c3e6b',
    '#FCE1B3': '#8b6b2a',
    '#E0D4E8': '#4a2a6b'
  };

  hogarEditando: Hogar | null = null;
  editTitulo: string = '';
  editSubtitulo: string = '';
  editDescripcion: string = '';

  ngOnInit() {
    // Cargar hogares iniciales o desde API
    this.cargarHogaresIniciales();
  }

  cargarHogaresIniciales() {
    // Hogar inicial de ejemplo
    this.hogares = [
      {
        id: 1,
        titulo: 'Hogar Principal',
        subtitulo: 'Mi familia',
        descripcion: 'Familia principal',
        color: '#B8E0D2',
        textColor: '#2c5f4e'
      }
    ];
  }

  getRandomColor(): string {
    return this.coloresPastel[Math.floor(Math.random() * this.coloresPastel.length)];
  }

  getTextColor(color: string): string {
    return this.textColors[color] || '#2c5f4e';
  }

  agregarHogar(): void {
    const nuevoColor = this.getRandomColor();
    const textoColor = this.getTextColor(nuevoColor);

    const nuevoHogar: Hogar = {
      id: this.nextId++,
      titulo: '',
      subtitulo: '',
      descripcion: '',
      color: nuevoColor,
      textColor: textoColor
    };

    this.hogares.push(nuevoHogar);
  }

  entrarHogar(hogar: Hogar): void {
    window.open(`/hogar/${hogar.id}`, '_blank');
  }

  abrirModalEditar(hogar: Hogar): void {
    this.hogarEditando = hogar;
    this.editTitulo = hogar.titulo;
    this.editSubtitulo = hogar.subtitulo;
    this.editDescripcion = hogar.descripcion;
  }

  guardarEdicion(): void {
    if (!this.hogarEditando) return;

    this.hogarEditando.titulo = this.editTitulo;
    this.hogarEditando.subtitulo = this.editSubtitulo;
    this.hogarEditando.descripcion = this.editDescripcion;

    this.cerrarModal();
  }

  eliminarHogar(hogar: Hogar): void {
    if (confirm('¿Eliminar este hogar?')) {
      this.hogares = this.hogares.filter(h => h.id !== hogar.id);
    }
  }

  cerrarModal(): void {
    this.hogarEditando = null;
    this.editTitulo = '';
    this.editSubtitulo = '';
    this.editDescripcion = '';
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Casa {
  id: number;
  titulo: string;
  subtitulo: string;
  codigo: string;
  descripcion: string;
  ubicacion: string;
  precio: string;
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

  casas: Casa[] = [];
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

  casaEditando: Casa | null = null;
  editTitulo: string = '';
  editSubtitulo: string = '';
  editCodigo: string = '';
  editDescripcion: string = '';
  editUbicacion: string = '';
  editPrecio: string = '';

  ngOnInit() {
    // Cargar casas iniciales o desde API
    this.cargarCasasIniciales();
  }

  cargarCasasIniciales() {
    // Casa inicial de ejemplo
    this.casas = [
      {
        id: 1,
        titulo: 'Casa Principal',
        subtitulo: 'Mi hogar',
        codigo: 'CP001',
        descripcion: 'Casa familiar cómoda',
        ubicacion: 'Centro',
        precio: '200,000',
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

  agregarCasa(): void {
    const nuevoColor = this.getRandomColor();
    const textoColor = this.getTextColor(nuevoColor);

    const nuevaCasa: Casa = {
      id: this.nextId++,
      titulo: '',
      subtitulo: '',
      codigo: '',
      descripcion: '',
      ubicacion: '',
      precio: '',
      color: nuevoColor,
      textColor: textoColor
    };

    this.casas.push(nuevaCasa);
  }

  entrarCasa(casa: Casa): void {
    alert(`Entrando a la casa ID: ${casa.id}`);
  }

  abrirModalEditar(casa: Casa): void {
    this.casaEditando = casa;
    this.editTitulo = casa.titulo;
    this.editSubtitulo = casa.subtitulo;
    this.editCodigo = casa.codigo;
    this.editDescripcion = casa.descripcion;
    this.editUbicacion = casa.ubicacion;
    this.editPrecio = casa.precio;
  }

  guardarEdicion(): void {
    if (!this.casaEditando) return;

    this.casaEditando.titulo = this.editTitulo;
    this.casaEditando.subtitulo = this.editSubtitulo;
    this.casaEditando.codigo = this.editCodigo;
    this.casaEditando.descripcion = this.editDescripcion;
    this.casaEditando.ubicacion = this.editUbicacion;
    this.casaEditando.precio = this.editPrecio;

    this.cerrarModal();
  }

  eliminarCasa(casa: Casa): void {
    if (confirm('¿Eliminar esta casa?')) {
      this.casas = this.casas.filter(c => c.id !== casa.id);
    }
  }

  cerrarModal(): void {
    this.casaEditando = null;
    this.editTitulo = '';
    this.editSubtitulo = '';
    this.editCodigo = '';
    this.editDescripcion = '';
    this.editUbicacion = '';
    this.editPrecio = '';
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InventarioItem {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
}

interface Hogar {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  color: string;
  textColor: string;
  inventario: InventarioItem[];
}

@Component({
  selector: 'app-mis-hogares',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-hogares.html',
  styleUrls: ['./mis-hogares.css']
})
export class MisHogaresComponent implements OnInit {
  hogares: Hogar[] = [];
  selectedHogar: Hogar | null = null;
  nextId: number = 1;

  // Control de vistas
  vistaActual: 'lista' | 'detalles' = 'lista';

  // Control de sección activa en detalles
  seccionActiva: string = 'home';

  // Control de submenús desplegables
  submenuOpen: { [key: string]: boolean } = {};

  // Colores pastel
  coloresPastel: string[] = [
    '#B8E0D2', '#FFD6B5', '#FFB5C2', '#C9E4DE',
    '#E8D1C5', '#D4E0F0', '#FCE1B3', '#E0D4E8'
  ];

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

  usuario = { nombre: 'fhdahfdah' };

  ngOnInit() {
    this.cargarHogares();
  }

  cargarHogares() {
    this.hogares = [
      {
        id: this.nextId++,
        titulo: 'Inventario Principal',
        subtitulo: 'Mi hogar',
        descripcion: 'Inventario general',
        color: this.getRandomColor(),
        textColor: this.getTextColor(this.getRandomColor()),
        inventario: []
      },
      {
        id: this.nextId++,
        titulo: 'Inventario Secundario',
        subtitulo: 'Mi hogar',
        descripcion: 'Stock adicional',
        color: this.getRandomColor(),
        textColor: this.getTextColor(this.getRandomColor()),
        inventario: []
      }
    ];
  }

  crearHogar() {
    const nuevoColor = this.getRandomColor();
    const nuevoHogar: Hogar = {
      id: this.nextId++,
      titulo: 'Nuevo Hogar',
      subtitulo: 'Mi familia',
      descripcion: 'Inventario creado por ' + this.usuario.nombre,
      color: nuevoColor,
      textColor: this.getTextColor(nuevoColor),
      inventario: []
    };
    this.hogares.push(nuevoHogar);
    this.selectedHogar = nuevoHogar;
    console.log('Inventario creado', nuevoHogar);
  }

  seleccionarHogar(hogar: Hogar) {
    this.selectedHogar = hogar;
  }

  entrarHogar(id: number) {
    this.selectedHogar = this.hogares.find(h => h.id === id) || null;
    this.vistaActual = 'detalles'; // cambia a la vista con sidebar
    this.seccionActiva = 'home';
    console.log(`Entrar al inventario con id ${id}`);
  }

  volverAlista() {
    this.vistaActual = 'lista';
    this.selectedHogar = null;
    this.seccionActiva = 'home';
  }

  editarHogar() {
    if (!this.selectedHogar) return;
    this.selectedHogar.titulo = this.selectedHogar.titulo + ' (editado)';
    this.selectedHogar.color = this.getRandomColor();
    this.selectedHogar.textColor = this.getTextColor(this.selectedHogar.color);
    console.log('Inventario editado', this.selectedHogar);
  }

  eliminarHogar() {
    if (!this.selectedHogar) return;
    const confirmacion = confirm(`¿Seguro que deseas eliminar "${this.selectedHogar.titulo}"?`);
    if (confirmacion) {
      this.hogares = this.hogares.filter(h => h.id !== this.selectedHogar!.id);
      console.log('Inventario eliminado');
      this.selectedHogar = null;
      this.vistaActual = 'lista';
      this.seccionActiva = 'home';
    }
  }

  // Control de submenús
  toggleSubmenu(menu: string) {
    this.submenuOpen[menu] = !this.submenuOpen[menu];
  }

  // Cambiar sección activa
  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    console.log('Sección activa:', seccion);
  }

  trackById(index: number, item: Hogar): any {
    return item.id;
  }

  // Helpers
  getRandomColor(): string {
    return this.coloresPastel[Math.floor(Math.random() * this.coloresPastel.length)];
  }

  getTextColor(color: string): string {
    return this.textColors[color] || '#333';
  }

  cerrarSesion() {
    console.log('Cerrar sesión');
  }
}

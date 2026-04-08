// src/app/main-module/list/list.ts (SIN BOOTSTRAP - CON MODALES MANUALES)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HomesService } from '../../servicesAPI/homes.service';
import { TareasService } from '../../servicesAPI/tareas.service';
import { MiembrosService } from '../../servicesAPI/miembros.service';

interface Hogar {
  id: number;
  id_hogar?: number;
  titulo: string;
  nombre_familiar?: string;
  subtitulo: string;
  descripcion: string;
  color: string;
  textColor: string;
}

interface Notificacion {
  id: number;
  tipo: 'success' | 'error' | 'warning' | 'info';
  mensaje: string;
  icono: string;
  timestamp: Date;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListComponent implements OnInit {

  // ========== VISTA ==========
  vistaActual: 'lista' | 'detalles' = 'lista';
  hogarActual: Hogar | null = null;

  // ========== HOGARES ==========
  hogares: Hogar[] = [];
  nextId: number = 2;

  // ========== TAREAS ==========
  tareas: any[] = [];
  loadingTareas = false;

  // ========== MIEMBROS ==========
  miembros: any[] = [];
  loadingMiembros = false;

  // ========== EDITAR HOGAR ==========
  hogarEditando: Hogar | null = null;
  editTitulo: string = '';
  editSubtitulo: string = '';
  editDescripcion: string = '';

  // ========== FORMULARIOS ==========
  formularioMiembro: FormGroup;
  formularioTarea: FormGroup;
  modoEdicionMiembro = false;
  miembroEnEdicion: any = null;

  // ========== ELIMINACIÓN CON CONFIRMACIÓN ==========
  hogarAEliminar: Hogar | null = null;
  textoConfirmacion: string = '';
  confirmarEliminacion: boolean = false;

  // ========== NOTIFICACIONES ==========
  notificaciones: Notificacion[] = [];
  notificacionIdCounter = 0;

  // ========== CONTROL DE MODALES (MANUAL) ==========
  modalEditarVisible = false;
  modalMiembroVisible = false;
  modalTareaVisible = false;
  modalEliminarVisible = false;
  tabActivo: 'tareas' | 'miembros' | 'gastos' = 'tareas';

  // ========== COLORES ==========
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

  constructor(
    private homesService: HomesService,
    private tareasService: TareasService,
    private miembrosService: MiembrosService,
    private fb: FormBuilder
  ) {
    this.formularioMiembro = this.fb.group({
      nombre: [''],
      es_admin: [false],
      preferencias_alimenticias: ['']
    });

    this.formularioTarea = this.fb.group({
      nombre: [''],
      descripcion: [''],
      duracion_minutos: [30],
      solo_adulto: [false]
    });
  }

  ngOnInit() {
    this.cargarHogares();
  }

  // ======================= HOGARES =======================

  cargarHogares() {
    this.homesService.listarHogares().subscribe({
      next: (data) => {
        this.hogares = data.map(h => ({
          id: h.id_hogar,
          id_hogar: h.id_hogar,
          titulo: h.nombre_familiar,
          nombre_familiar: h.nombre_familiar,
          subtitulo: 'Mi hogar',
          descripcion: 'Hogar',
          color: this.getRandomColor(),
          textColor: this.getTextColor(this.getRandomColor())
        }));
        this.mostrarNotificacion('success', 'Hogares cargados correctamente', '✅');
      },
      error: (err) => {
        this.mostrarNotificacion('error', 'Error al cargar hogares', '❌');
        console.error('Error cargando hogares:', err);
      }
    });
  }

  agregarHogar(): void {
    const nuevoColor = this.getRandomColor();
    const nuevoHogar: Hogar = {
      id: this.nextId++,
      titulo: 'Nuevo Hogar',
      subtitulo: 'Mi familia',
      descripcion: 'Nuevo hogar',
      color: nuevoColor,
      textColor: this.getTextColor(nuevoColor)
    };
    this.hogares.push(nuevoHogar);
    this.mostrarNotificacion('success', 'Hogar creado exitosamente', '✨');
  }

  entrarHogar(hogar: Hogar): void {
    this.hogarActual = hogar;
    this.vistaActual = 'detalles';
    this.tabActivo = 'tareas';
    this.cargarTareas(hogar.id_hogar || hogar.id);
    this.cargarMiembros(hogar.id_hogar || hogar.id);
  }

  volverAlista(): void {
    this.vistaActual = 'lista';
    this.hogarActual = null;
  }

  cambiarTab(tab: 'tareas' | 'miembros' | 'gastos'): void {
    this.tabActivo = tab;
  }

  // ========== MODALES MANUALES ==========

  abrirModalEditar(hogar: Hogar): void {
    this.hogarEditando = hogar;
    this.editTitulo = hogar.titulo;
    this.editSubtitulo = hogar.subtitulo;
    this.editDescripcion = hogar.descripcion;
    this.modalEditarVisible = true;
  }

  cerrarModal(): void {
    this.modalEditarVisible = false;
    this.hogarEditando = null;
    this.editTitulo = '';
    this.editSubtitulo = '';
    this.editDescripcion = '';
  }

  cerrarModalFondo(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.cerrarModal();
    }
  }

  guardarEdicion(): void {
    if (!this.hogarEditando) return;
    this.hogarEditando.titulo = this.editTitulo;
    this.hogarEditando.subtitulo = this.editSubtitulo;
    this.hogarEditando.descripcion = this.editDescripcion;
    this.mostrarNotificacion('success', `"${this.editTitulo}" actualizado correctamente`, '✏️');
    this.cerrarModal();
  }

  // ========== ELIMINACIÓN CON CONFIRMACIÓN ==========

  abrirConfirmacionEliminar(hogar: Hogar, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.hogarAEliminar = hogar;
    this.confirmarEliminacion = false;
    this.textoConfirmacion = '';
    this.modalEliminarVisible = true;
  }

  cerrarEliminarModalFondo(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.cancelarEliminar();
    }
  }

  confirmarYEliminar(): void {
    if (!this.hogarAEliminar) return;

    if (this.textoConfirmacion.toLowerCase() !== this.hogarAEliminar.titulo.toLowerCase()) {
      this.mostrarNotificacion('error', 'El texto no coincide con el nombre del hogar', '❌');
      return;
    }

    if (!this.confirmarEliminacion) {
      this.mostrarNotificacion('warning', 'Debes aceptar la confirmación', '⚠️');
      return;
    }

    this.homesService.eliminarHogar(this.hogarAEliminar.id_hogar || this.hogarAEliminar.id).subscribe({
      next: () => {
        this.hogares = this.hogares.filter(
          h => (h.id_hogar || h.id) !== (this.hogarAEliminar!.id_hogar || this.hogarAEliminar!.id)
        );

        this.mostrarNotificacion(
          'success',
          `"${this.hogarAEliminar?.titulo || 'Hogar'}" eliminado correctamente`,
          '🗑️'
        );

        this.cancelarEliminar();
      },
      error: () => {
        this.mostrarNotificacion('error', 'Error al eliminar el hogar', '❌');
      }
    });
  }

  cancelarEliminar(): void {
    this.modalEliminarVisible = false;
    this.hogarAEliminar = null;
    this.textoConfirmacion = '';
    this.confirmarEliminacion = false;
  }

  // ======================= TAREAS =======================

  cargarTareas(idHogar: number) {
    this.loadingTareas = true;
    this.tareasService.listarTareasHogar(idHogar).subscribe({
      next: (data) => {
        this.tareas = data;
        this.loadingTareas = false;
      },
      error: (err) => {
        this.mostrarNotificacion('error', 'Error cargando tareas', '❌');
        this.loadingTareas = false;
      }
    });
  }

  abrirCrearTarea() {
    this.formularioTarea.reset({
      nombre: '',
      descripcion: '',
      duracion_minutos: 30,
      solo_adulto: false
    });
    this.modalTareaVisible = true;
  }

  cerrarTareaModalFondo(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.cerrarTareaModal();
    }
  }

  cerrarTareaModal() {
    this.modalTareaVisible = false;
    this.formularioTarea.reset();
  }

  guardarTarea() {
    if (!this.hogarActual) return;
    this.tareasService.crearTarea(this.hogarActual.id_hogar || this.hogarActual.id, this.formularioTarea.value).subscribe({
      next: (tarea) => {
        this.tareas.push(tarea);
        this.mostrarNotificacion('success', 'Tarea creada correctamente', '✅');
        this.cerrarTareaModal();
      },
      error: (err) => {
        this.mostrarNotificacion('error', 'Error creando tarea', '❌');
      }
    });
  }

  asignarTarea(idTarea: number) {
    this.mostrarNotificacion('info', 'Función en desarrollo', 'ℹ️');
  }

  completarTarea(idTarea: number) {
    this.tareasService.completarTarea(idTarea).subscribe({
      next: () => {
        const tarea = this.tareas.find(t => t.id_tarea === idTarea);
        if (tarea) {
          tarea.realizada = true;
          this.mostrarNotificacion('success', 'Tarea completada', '✅');
        }
      },
      error: (err) => this.mostrarNotificacion('error', 'Error completando tarea', '❌')
    });
  }

  eliminarTarea(idTarea: number) {
    if (confirm('¿Eliminar esta tarea?')) {
      this.tareasService.eliminarTarea(idTarea).subscribe({
        next: () => {
          this.tareas = this.tareas.filter(t => t.id_tarea !== idTarea);
          this.mostrarNotificacion('success', 'Tarea eliminada', '✅');
        },
        error: (err) => this.mostrarNotificacion('error', 'Error eliminando tarea', '❌')
      });
    }
  }

  // ======================= MIEMBROS =======================

  cargarMiembros(idHogar: number) {
    this.loadingMiembros = true;
    this.homesService.listarMiembrosDelHogar(idHogar).subscribe({
      next: (data) => {
        this.miembros = data;
        this.loadingMiembros = false;
      },
      error: (err) => {
        this.mostrarNotificacion('error', 'Error cargando miembros', '❌');
        this.loadingMiembros = false;
      }
    });
  }

  abrirAgregarMiembro() {
    this.modoEdicionMiembro = false;
    this.miembroEnEdicion = null;
    this.formularioMiembro.reset({
      nombre: '',
      es_admin: false,
      preferencias_alimenticias: ''
    });
    this.modalMiembroVisible = true;
  }

  cerrarMiembroModalFondo(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.cerrarMiembroModal();
    }
  }

  cerrarMiembroModal() {
    this.modalMiembroVisible = false;
    this.formularioMiembro.reset();
    this.modoEdicionMiembro = false;
    this.miembroEnEdicion = null;
  }

  editarMiembro(idMiembro: number) {
    this.modoEdicionMiembro = true;
    const miembro = this.miembros.find(m => m.id_miembro === idMiembro);
    if (miembro) {
      this.miembroEnEdicion = miembro;
      this.formularioMiembro.patchValue({
        nombre: miembro.nombre,
        es_admin: miembro.es_admin,
        preferencias_alimenticias: miembro.preferencias_alimenticias || ''
      });
      this.modalMiembroVisible = true;
    }
  }

  guardarMiembro() {
    if (this.modoEdicionMiembro && this.miembroEnEdicion) {
      this.miembrosService.actualizarMiembro(this.miembroEnEdicion.id_miembro, this.formularioMiembro.value).subscribe({
        next: (miembroActualizado) => {
          const index = this.miembros.findIndex(m => m.id_miembro === miembroActualizado.id_miembro);
          if (index > -1) {
            this.miembros[index] = miembroActualizado;
          }
          this.mostrarNotificacion('success', 'Miembro actualizado', '✅');
          this.cerrarMiembroModal();
        },
        error: (err) => this.mostrarNotificacion('error', 'Error actualizando miembro', '❌')
      });
    } else if (this.hogarActual) {
      this.homesService.agregarMiembroAlHogar(this.hogarActual.id_hogar || this.hogarActual.id, this.formularioMiembro.value).subscribe({
        next: (miembro) => {
          this.miembros.push(miembro);
          this.mostrarNotificacion('success', 'Miembro agregado correctamente', '✅');
          this.cerrarMiembroModal();
        },
        error: (err) => this.mostrarNotificacion('error', 'Error agregando miembro', '❌')
      });
    }
  }

  eliminarMiembro(idMiembro: number) {
    if (confirm('¿Eliminar este miembro?')) {
      this.miembrosService.eliminarMiembro(idMiembro).subscribe({
        next: () => {
          this.miembros = this.miembros.filter(m => m.id_miembro !== idMiembro);
          this.mostrarNotificacion('success', 'Miembro eliminado', '✅');
        },
        error: (err) => this.mostrarNotificacion('error', 'Error eliminando miembro', '❌')
      });
    }
  }

  // ======================= NOTIFICACIONES =======================

  mostrarNotificacion(
    tipo: 'success' | 'error' | 'warning' | 'info',
    mensaje: string,
    icono: string = '✓'
  ): void {
    const notificacion: Notificacion = {
      id: ++this.notificacionIdCounter,
      tipo,
      mensaje,
      icono,
      timestamp: new Date()
    };

    this.notificaciones.push(notificacion);

    setTimeout(() => {
      this.notificaciones = this.notificaciones.filter(n => n.id !== notificacion.id);
    }, 5000);
  }

  eliminarNotificacion(id: number): void {
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
  }

  // ======================= HELPERS =======================

  getRandomColor(): string {
    return this.coloresPastel[Math.floor(Math.random() * this.coloresPastel.length)];
  }

  getTextColor(color: string): string {
    return this.textColors[color] || '#2c5f4e';
  }
}
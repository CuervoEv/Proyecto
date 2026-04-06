import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface SettingsData {
  userName: string;
  language: string;
  notifications: boolean;
  theme: string;
  primaryColor: string;
  primaryTextColor: string;
  fontSizeLevel: number;
  cardsPerRow: string;
  showAnimations: boolean;
  showEmptyCards: boolean;
  dateFormat: string;
  currency: string;
  firstDayWeek: string;
  
  // 👇 AÑADE ESTAS DOS PROPIEDADES
  taskReminders: boolean;
  expiryAlerts: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {

  activeSection: string = 'general';

  colorList = [
    { code: '#B8E0D2', name: 'Verde menta' },
    { code: '#FFD6B5', name: 'Durazno' },
    { code: '#FFB5C2', name: 'Rosa pastel' },
    { code: '#C9E4DE', name: 'Verde agua' },
    { code: '#E8D1C5', name: 'Beige' },
    { code: '#D4E0F0', name: 'Azul pastel' },
    { code: '#FCE1B3', name: 'Amarillo pastel' },
    { code: '#E0D4E8', name: 'Lavanda' },
    { code: '#2d6a4f', name: 'Verde oscuro' },
    { code: '#1a1a2e', name: 'Gris oscuro' },
    { code: '#2d3748', name: 'Gris pizarra' }
  ];

  pastelColors: { [key: string]: string } = {
    '#B8E0D2': '#2c5f4e',
    '#FFD6B5': '#8b5a2b',
    '#FFB5C2': '#8b3a4a',
    '#C9E4DE': '#2c5f4e',
    '#E8D1C5': '#6b3e2a',
    '#D4E0F0': '#2c3e6b',
    '#FCE1B3': '#8b6b2a',
    '#E0D4E8': '#4a2a6b',
    '#2d6a4f': '#ffffff',
    '#1a1a2e': '#ffffff',
    '#2d3748': '#ffffff'
  };

 settings: SettingsData = {
  userName: '',
  language: 'es',
  notifications: false,
  theme: 'light',
  primaryColor: '#B8E0D2',
  primaryTextColor: '#2c5f4e',
  fontSizeLevel: 3,
  cardsPerRow: '3',
  showAnimations: true,
  showEmptyCards: false,
  dateFormat: 'DD/MM/YYYY',
  currency: 'EUR',
  firstDayWeek: 'monday',
  
  // 👇 AÑADE ESTOS VALORES
  taskReminders: true,
  expiryAlerts: true
};
  constructor(private router: Router) {}

  ngOnInit() {
  this.loadSettings();
  this.cargarUsuario();
  
  // Cargar nivel de fuente guardado
  const savedFontSizeLevel = localStorage.getItem('appFontSizeLevel');
  if (savedFontSizeLevel) {
    this.settings.fontSizeLevel = parseInt(savedFontSizeLevel);
  }
  
  setTimeout(() => {
    this.aplicarColores();
    this.applyTheme();
  }, 100);
}
  

  cargarUsuario() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        const userData = JSON.parse(usuario);
        this.settings.userName = userData.usuario || userData.nombre || '';
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  loadSettings() {
  const savedSettings = localStorage.getItem('appSettings');
  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings);
      this.settings = { ...this.settings, ...parsed };
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }
}

  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));
    this.aplicarColores();
    this.applyTheme();
    alert('✅ Configuración guardada exitosamente');
  }

  aplicarColores() {
    const color = this.settings.primaryColor;
    const textColor = this.pastelColors[color] || '#2c5f4e';
    
    // HEADER
    const headerNav = document.querySelector('app-header .navbar');
    if (headerNav) {
      (headerNav as HTMLElement).style.backgroundColor = color;
      (headerNav as HTMLElement).style.setProperty('background-color', color, 'important');
    }
    
    // SIDEBAR
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      (sidebar as HTMLElement).style.background = `linear-gradient(180deg, ${color} 0%, ${this.oscurecerColor(color, 10)} 100%)`;
    }
    
    // FOOTER
    const footer = document.querySelector('app-footer .footer');
    if (footer) {
      (footer as HTMLElement).style.background = `linear-gradient(180deg, ${color} 0%, ${this.oscurecerColor(color, 10)} 100%)`;
    }
    
    // ELIMINAR FONDO DE LAS CARDS DE SETTINGS
    const settingsCards = document.querySelectorAll('.card');
    settingsCards.forEach((card) => {
      (card as HTMLElement).style.backgroundColor = 'white';
      (card as HTMLElement).style.background = 'white';
    });
    
    // Fondo general
    document.body.style.backgroundColor = this.clarificarColor(color, 90);
    
    // CSS variable
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-text', textColor);
    
    console.log('🎨 Colores aplicados:', color);
  }

  oscurecerColor(color: string, porcentaje: number): string {
    if (color === '#1a1a2e') return '#0f0f1a';
    if (color === '#2d3748') return '#1a202c';
    
    let r, g, b;
    if (color.startsWith('#')) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else {
      return color;
    }
    
    r = Math.max(0, r - (r * porcentaje / 100));
    g = Math.max(0, g - (g * porcentaje / 100));
    b = Math.max(0, b - (b * porcentaje / 100));
    
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  clarificarColor(color: string, porcentaje: number): string {
    if (color === '#1a1a2e') return '#2a2a40';
    if (color === '#2d3748') return '#4a5a6e';
    
    let r, g, b;
    if (color.startsWith('#')) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else {
      return color;
    }
    
    r = Math.min(255, r + ((255 - r) * porcentaje / 100));
    g = Math.min(255, g + ((255 - g) * porcentaje / 100));
    b = Math.min(255, b + ((255 - b) * porcentaje / 100));
    
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  applyTheme() {
  // Niveles de fuente: 1=12px, 2=14px, 3=16px, 4=18px, 5=20px
  const fontSizeMap: { [key: number]: string } = {
    1: '12px',
    2: '14px',
    3: '16px',
    4: '18px',
    5: '20px'
  };
  
  const fontSize = fontSizeMap[this.settings.fontSizeLevel] || '16px';
  
  // Aplicar directamente al body
  document.body.style.fontSize = fontSize;
  document.body.style.setProperty('font-size', fontSize, 'important');
  
  // Aplicar a todos los elementos
  const allElements = document.querySelectorAll('*');
  allElements.forEach((el) => {
    (el as HTMLElement).style.fontSize = fontSize;
  });
  
  // Guardar en localStorage
  localStorage.setItem('appFontSize', fontSize);
  localStorage.setItem('appFontSizeLevel', this.settings.fontSizeLevel.toString());
  
  console.log(`🔤 Fuente cambiada a nivel ${this.settings.fontSizeLevel}: ${fontSize}`);
}
  getFontSizeLabel(level: number): string {
    const labels: { [key: number]: string } = {
      1: 'Muy pequeño',
      2: 'Pequeño',
      3: 'Normal',
      4: 'Grande',
      5: 'Muy grande'
    };
    return labels[level] || 'Normal';
  }

  selectColor(color: string) {
    this.settings.primaryColor = color;
    this.settings.primaryTextColor = this.pastelColors[color] || '#2c5f4e';
    this.aplicarColores();
  }

  exportData() {
    const hogares = JSON.parse(localStorage.getItem('hogares') || '[]');
    const usuario = localStorage.getItem('usuario');
    
    const data = {
      settings: this.settings,
      hogares: hogares,
      usuario: usuario ? JSON.parse(usuario) : null,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Datos exportados correctamente');
  }

  importData(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.settings) {
          this.settings = { ...this.settings, ...data.settings };
          this.saveSettings();
        }
        
        if (data.hogares) {
          localStorage.setItem('hogares', JSON.stringify(data.hogares));
        }
        
        if (data.usuario) {
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
        }
        
        alert('✅ Datos importados exitosamente');
        window.location.reload();
      } catch (error) {
        alert('❌ Error al importar los datos. Archivo inválido.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  resetData() {
  if (confirm('⚠️ ¿Estás seguro de que quieres restablecer toda la configuración?')) {
    localStorage.removeItem('appSettings');
    localStorage.removeItem('hogares');
    localStorage.removeItem('appFontSizeLevel');
    
    this.settings = {
      userName: '',
      language: 'es',
      notifications: false,
      theme: 'light',
      primaryColor: '#B8E0D2',
      primaryTextColor: '#2c5f4e',
      fontSizeLevel: 3,
      cardsPerRow: '3',
      showAnimations: true,
      showEmptyCards: false,
      dateFormat: 'DD/MM/YYYY',
      currency: 'EUR',
      firstDayWeek: 'monday',
      taskReminders: true,
      expiryAlerts: true
    };
    
    this.cargarUsuario();
    this.saveSettings();
    this.aplicarColores();
    this.applyTheme();
    
    alert('✅ Configuración restablecida');
  }
}

  goBack() {
    this.router.navigate(['/hogares']);
  }
}
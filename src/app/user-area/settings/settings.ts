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
  fontSize: string;
  cardsPerRow: string;
  showAnimations: boolean;
  showEmptyCards: boolean;
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

  pastelColors: { [key: string]: string } = {
    '#B8E0D2': '#2c5f4e',
    '#FFD6B5': '#8b5a2b',
    '#FFB5C2': '#8b3a4a',
    '#C9E4DE': '#2c5f4e',
    '#E8D1C5': '#6b3e2a',
    '#D4E0F0': '#2c3e6b',
    '#FCE1B3': '#8b6b2a',
    '#E0D4E8': '#4a2a6b'
  };

  settings: SettingsData = {
    userName: '',
    language: 'es',
    notifications: false,
    theme: 'light',
    primaryColor: '#B8E0D2',
    primaryTextColor: '#2c5f4e',
    fontSize: 'medium',
    cardsPerRow: '3',
    showAnimations: true,
    showEmptyCards: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadSettings();
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('misCasasSettings');
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
    localStorage.setItem('misCasasSettings', JSON.stringify(this.settings));
    alert('Configuración guardada exitosamente');
  }

  selectColor(color: string) {
    this.settings.primaryColor = color;
    this.settings.primaryTextColor = this.pastelColors[color] || '#2c5f4e';
  }

  exportData() {
    const data = {
      settings: this.settings,
      casas: JSON.parse(localStorage.getItem('casas') || '[]'),
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis-casas-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        if (data.casas) {
          localStorage.setItem('casas', JSON.stringify(data.casas));
        }
        alert('Datos importados exitosamente');
        window.location.reload();
      } catch (error) {
        alert('Error al importar los datos');
      }
    };
    reader.readAsText(file);
  }

  resetData() {
    if (confirm('¿Estás seguro de que quieres restablecer toda la configuración?')) {
      localStorage.removeItem('misCasasSettings');
      localStorage.removeItem('casas');
      this.settings = {
        userName: '',
        language: 'es',
        notifications: false,
        theme: 'light',
        primaryColor: '#B8E0D2',
        primaryTextColor: '#2c5f4e',
        fontSize: 'medium',
        cardsPerRow: '3',
        showAnimations: true,
        showEmptyCards: false
      };
      alert('Configuración restablecida');
    }
  }

  goBack() {
    this.router.navigate(['/hogares']);
  }
}
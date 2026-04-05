
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

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  loadSettings() {
    const saved = localStorage.getItem('misCasasSettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
    this.applyFontSize(this.settings.fontSize);
  }

  saveSettings() {
    localStorage.setItem('misCasasSettings', JSON.stringify(this.settings));
    this.applySettings();
  }

  selectColor(color: string) {
    this.settings.primaryColor = color;
    this.settings.primaryTextColor = this.pastelColors[color] || '#2c5f4e';
    this.saveSettings();
  }

  isColorSelected(color: string): boolean {
    return this.settings.primaryColor === color;
  }

  applyFontSize(size: string) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
  }

  applySettings() {
    this.applyFontSize(this.settings.fontSize);
    localStorage.setItem('cardsPerRow', this.settings.cardsPerRow);
    localStorage.setItem('showAnimations', this.settings.showAnimations.toString());
    localStorage.setItem('primaryColor', this.settings.primaryColor);
    localStorage.setItem('primaryTextColor', this.settings.primaryTextColor);
  }

  exportData() {
    const cards = localStorage.getItem('misCasasCards');
    const settings = localStorage.getItem('misCasasSettings');
    const data = {
      cards: cards ? JSON.parse(cards) : [],
      settings: settings ? JSON.parse(settings) : {},
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis_casas_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.importData(file);
    }
  }

  importData(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.cards) {
          localStorage.setItem('misCasasCards', JSON.stringify(data.cards));
        }
        if (data.settings) {
          localStorage.setItem('misCasasSettings', JSON.stringify(data.settings));
          this.loadSettings();
        }
        alert('Datos importados correctamente');
      } catch (error) {
        alert('Error al importar los datos');
      }
    };
    reader.readAsText(file);
  }

  resetData() {
    if (confirm('¿Estás seguro de que quieres restablecer todos los valores? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('misCasasCards');
      localStorage.removeItem('misCasasSettings');
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
}
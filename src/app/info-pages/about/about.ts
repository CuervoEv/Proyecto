import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit {

  about = {
    titulo: '',
    descripcion: '',
    mision: '',
    vision: ''
  };

  ngOnInit(): void {
    const data = localStorage.getItem('about');
    if (data) {
      this.about = JSON.parse(data);
    }
  }

  guardar() {
    localStorage.setItem('about', JSON.stringify(this.about));
  }
}
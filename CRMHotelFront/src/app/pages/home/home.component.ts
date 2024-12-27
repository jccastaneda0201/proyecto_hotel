import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  router = inject(Router);

  reserva: FormGroup = new FormGroup(
    {
      llegada: new FormControl(),
      salida: new FormControl(),
      num_personas: new FormControl(),
    })


  onSubmit() {
    localStorage.setItem('busqueda', JSON.stringify(this.reserva.value));
    this.router.navigate(['/busqueda']);
  }

}

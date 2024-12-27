import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitacionesService } from '../../../services/habitaciones.service';
import Swal from 'sweetalert2';
import Habitacion from '../../../interfaces/habitacion.interface';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-nueva-habitacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-habitacion.component.html',
  styleUrl: './nueva-habitacion.component.css'
})

export class NuevaHabitacionComponent {

  router = inject(Router);
  habitacionesService = inject(HabitacionesService);


  formulario: FormGroup = new FormGroup({
    piso: new FormControl(1),
    puerta: new FormControl(101),
    mascotas: new FormControl(2),
    num_camas: new FormControl('Doble'),
    categoria: new FormControl('Deluxe'),
    precio: new FormControl(1230),
    tamanho: new FormControl('Grande'),
    vista: new FormControl('Exterior'),
    cocina: new FormControl(1)
  });




  async onSubmit() {
    try {
      console.log(this.formulario.value);
      const habitacion = await this.habitacionesService.create(this.formulario.value);
      Swal.fire({ title: 'Nuevo Habitacion', text: 'La habitacion se ha creado con éxito', icon: 'success' });
      this.router.navigateByUrl('/dashboard/habitaciones');
    } catch (error) {
      console.log(error);
    }
  }
}



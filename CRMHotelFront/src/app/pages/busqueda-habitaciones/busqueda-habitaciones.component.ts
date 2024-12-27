import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HabitacionesService } from '../../services/habitaciones.service';
import Habitacion from '../../interfaces/habitacion.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-busqueda-habitaciones',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './busqueda-habitaciones.component.html',
  styleUrl: './busqueda-habitaciones.component.css'
})
export class BusquedaHabitacionesComponent {

  habitacionesService = inject(HabitacionesService);
  router = inject(Router);

  arrHabitaciones: Habitacion[] = [];

  busqueda: FormGroup = new FormGroup(
    {
      llegada: new FormControl(),
      salida: new FormControl(),
      num_personas: new FormControl(),
    })

  async ngOnInit() {
    try {

      const busqueda = localStorage.getItem("busqueda")
      const data = JSON.parse(busqueda!)
      this.busqueda.setValue({
        llegada: data.llegada,
        salida: data.salida,
        num_personas: data.num_personas
      })

      const response = await this.habitacionesService.getBusqueda(data.llegada, data.salida)
      this.arrHabitaciones = response
      console.log(this.arrHabitaciones)

    } catch (error) {
      console.log(error)
    }
  }

  async onSubmit() {

    try {
      const response = await this.habitacionesService.getBusqueda(this.busqueda.value.llegada, this.busqueda.value.salida)
      this.arrHabitaciones = response
    } catch (error) {
      console.log(error)
    }

  }

  guardarLocal(habitacionId: number) {
    localStorage.setItem("habitacion_seleccionada", JSON.stringify(habitacionId));
    this.router.navigate(['/reservas']);
  }
}

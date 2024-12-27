import { Component, inject } from '@angular/core';
import { Reserva } from '../../interfaces/reserva';
import { ReservasService } from '../../services/reservas.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crm-reservas',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crm-reservas.component.html',
  styleUrl: './crm-reservas.component.css'
})
export class CrmReservasComponent {

  formulario: FormGroup = new FormGroup({
    fecha_entrada: new FormControl(''),
    fecha_salida: new FormControl('')
  })

  formularioDni: FormGroup = new FormGroup({
    dni: new FormControl('')
  })

  arrrReservas: Reserva[] = []
  router = inject(Router)

  reservasService = inject(ReservasService)

  async ngOnInit() {
    try {
      const response = await this.reservasService.getAll()
      console.log(response);
      this.arrrReservas = response
    } catch (error) {
      console.log(error)

    }
  }

  async filtrarFecha() {
    try {
      const response = await this.reservasService.filterByFechas(this.formulario.value.fecha_entrada, this.formulario.value.fecha_salida)
      this.arrrReservas = response
    } catch (error) {
      console.log(error)
    }

  }

  async filtrarDni() {
    try {
      const response = await this.reservasService.filterByDni(this.formularioDni.value.dni)
      this.arrrReservas = response
    } catch (error) {
      console.log(error)
    }
  }
}

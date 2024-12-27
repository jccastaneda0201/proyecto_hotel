import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservasService } from '../../services/reservas.service';
import { Reserva } from '../../interfaces/reserva';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-reserva.component.html',
  styleUrl: './edit-reserva.component.css'
})
export class EditReservaComponent {
  reservaService = inject(ReservasService)
  router = inject(Router)
  reserva: Reserva | null = null
  @Input() resId: number = 0;

  editForm: FormGroup = new FormGroup({

    fecha_entrada: new FormControl(null, [Validators.required]),
    fecha_salida: new FormControl(null, [Validators.required]),
    num_personas: new FormControl(null, [Validators.required]),
    regimen: new FormControl("", [Validators.required]),
    tipo_cancelacion: new FormControl("", [Validators.required]),
    aparcamiento: new FormControl(false, [Validators.required]),
    desayuno: new FormControl("", [Validators.required]),
    spa: new FormControl(true, [Validators.required]),
    gimnasio: new FormControl(false, [Validators.required]),
    piscina: new FormControl(true, [Validators.required]),
    metodo_pago: new FormControl("", [Validators.required]),

  })

  async ngOnInit() {
    try {
      this.reserva = await this.reservaService.filterById(this.resId)

      this.editForm.setValue({
        fecha_entrada: this.reserva?.fecha_entrada,
        fecha_salida: this.reserva?.fecha_salida,
        num_personas: this.reserva?.num_personas,
        regimen: this.reserva?.regimen,
        tipo_cancelacion: this.reserva?.tipo_cancelacion,

        aparcamiento: this.reserva?.aparcamiento,
        desayuno: this.reserva?.desayuno,
        spa: this.reserva?.spa,
        gimnasio: this.reserva?.gimnasio,
        piscina: this.reserva?.piscina,
        metodo_pago: this.reserva?.metodo_pago
      })

    } catch (error) {
      console.log(error)
    }
  }
  async editarReserva() {
    try {
      const response = await this.reservaService.editReserva(this.resId, this.editForm.value)
      Swal.fire('Actualizar Reserva', 'La reserva se ha actualizado correctamente', 'success')
      this.router.navigate(['dashboard/reservas'])
      console.log(response)

    } catch (error) {
      Swal.fire('Actualizar Reserva', 'Ha habido un problema con tu petición', 'error')
      console.log(error)
    }
  }
}

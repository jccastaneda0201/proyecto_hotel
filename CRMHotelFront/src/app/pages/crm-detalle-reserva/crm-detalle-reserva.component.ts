import { Component, inject, Input } from '@angular/core';
import { Reserva } from '../../interfaces/reserva';
import { ReservasService } from '../../services/reservas.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crm-detalle-reserva',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './crm-detalle-reserva.component.html',
  styleUrl: './crm-detalle-reserva.component.css'
})
export class CrmDetalleReservaComponent {

  reserva: Reserva | null = null

  @Input() id: number = 0

  reservasService = inject(ReservasService)

  async ngOnInit() {
    try {
      this.reserva = await this.reservasService.filterById(this.id)
      console.log(this.reserva)
    } catch (error) {
      console.log(error)
    }
  }

  async cancelarReserva() {

    try {
      const reserva = await this.reservasService.cancelarReserva(this.id)

      Swal.fire({
        title: 'Reserva cancelada',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

      this.reserva = reserva

    } catch (error) {
      console.log(error);
    }

  }
}

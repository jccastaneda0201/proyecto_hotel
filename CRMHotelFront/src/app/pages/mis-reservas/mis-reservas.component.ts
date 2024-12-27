import { Component, inject } from '@angular/core';
import { Reserva } from '../../interfaces/reserva';
import { ReservasService } from '../../services/reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent {

  reservasService = inject(ReservasService)

  arrReservas: Reserva[] = []

  async ngOnInit() {
    this.arrReservas = await this.reservasService.getReservasByUser()
    console.log(this.arrReservas)
  }

  async cancelarReserva(reservaId: number) {

    try {
      const reserva = await this.reservasService.cancelarReserva(reservaId)

      Swal.fire({
        title: 'Reserva cancelada',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

      this.arrReservas = await this.reservasService.getReservasByUser()

    } catch (error) {
      console.log(error);
    }

  }
}

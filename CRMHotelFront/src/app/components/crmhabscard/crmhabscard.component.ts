import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Habitacion from '../../interfaces/habitacion.interface';
import { CrmHabsService } from '../../services/crm-habs.service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crmhabscard',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './crmhabscard.component.html',
  styleUrl: './crmhabscard.component.css'
})
export class CrmhabscardComponent {
  @Input() habitacion: Habitacion | null = null
  @Output() habitacionBorrada: EventEmitter<Habitacion> = new EventEmitter
  arrHabitaciones: Habitacion[] = []

  crmHabsService = inject(CrmHabsService)
  async borrarHab() { //no funciona, revisar
    const result = await Swal.fire({ title: 'Eliminar habitación', text: '¿Estás seguro que quieres eliminar esta habitación? Si le das a aceptar, no podrás deshacer esta acción', icon: 'question', showCancelButton: true, confirmButtonText: 'Sí, quiero eliminarla' });
    if (result.isConfirmed) {
      try {
        if (this.habitacion) {
          this.habitacion = await this.crmHabsService.deleteHabitacion(this.habitacion.id)
          this.habitacionBorrada.emit(this.habitacion)
          Swal.fire('Eliminar habitación', 'La habitación ha sido eliminado con éxito', 'success')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

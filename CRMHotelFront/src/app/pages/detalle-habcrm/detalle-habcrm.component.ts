import { Component, inject, Input } from '@angular/core';
import Habitacion from '../../interfaces/habitacion.interface';
import { CrmHabsService } from '../../services/crm-habs.service';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle-habcrm',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './detalle-habcrm.component.html',
  styleUrl: './detalle-habcrm.component.css'
})
export class DetalleHabcrmComponent {
  @Input() habId: number = 0;

  habitacion: Habitacion | null = null;

  files: any;



  crmHabService = inject(CrmHabsService);
  imageForm: FormGroup = new FormGroup({
    imagen: new FormControl()
  })


  async ngOnInit() {
    try {

      this.habitacion = await this.crmHabService.getHabById(this.habId)
      console.log(this.habitacion)
    } catch (error) {
      console.log(error)
    }
  }

  onSubmit() {


    const formData = new FormData();
    formData.append('imagen', this.files[0]);

    this.crmHabService.subirImagen(this.habId, formData)
    //ToDo: Gestionar respuesta y el servicio
  }

  onFileChange(event: any) {
    this.files = event.target.files;
  }
  async deleteFoto(imagenId: any) {

    const result = await Swal.fire({ title: 'Eliminar habitación', text: '¿Estás seguro que quieres eliminar esta habitación? Si le das a aceptar, no podrás deshacer esta acción', icon: 'question', showCancelButton: true, confirmButtonText: 'Sí, quiero eliminarla' });
    if (result.isConfirmed) {
      try {
        const response = await this.crmHabService.deleteImagen(imagenId)
        console.log(response)
        Swal.fire('Eliminar habitación', 'La habitación ha sido eliminado con éxito', 'success')
      } catch (error) {
        console.log(error)
      }
    }
  }
}



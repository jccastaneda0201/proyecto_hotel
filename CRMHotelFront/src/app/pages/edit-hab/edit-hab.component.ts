import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import Habitacion from '../../interfaces/habitacion.interface';
import { CrmHabsService } from '../../services/crm-habs.service';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hab',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-hab.component.html',
  styleUrl: './edit-hab.component.css'
})
export class EditHabComponent {
  @Input() habId: number = 0;

  router = inject(Router)

  habitacion: Habitacion | null = null

  crmHabService = inject(CrmHabsService)

  editFormHab: FormGroup = new FormGroup({
    piso: new FormControl([Validators.required]),
    puerta: new FormControl([Validators.required]),
    mascotas: new FormControl("", [Validators.required]),
    num_camas: new FormControl("", [Validators.required]),
    categoria: new FormControl("", [Validators.required]),
    precio: new FormControl([Validators.required]),
    tamanho: new FormControl("", [Validators.required]),
    vista: new FormControl("", [Validators.required]),
    cocina: new FormControl("", [Validators.required])
  })

  async ngOnInit() {
    try {
      this.habitacion = await this.crmHabService.getHabById(this.habId)

      this.editFormHab.setValue({
        piso: this.habitacion?.piso,
        puerta: this.habitacion?.puerta,
        mascotas: this.habitacion?.mascotas,
        num_camas: this.habitacion?.num_camas,
        categoria: this.habitacion?.categoria,
        precio: this.habitacion?.precio,
        tamanho: this.habitacion?.tamanho,
        vista: this.habitacion?.vista,
        cocina: this.habitacion?.cocina
      })

    } catch (error) {
      console.log(error)
    }
  }
  async onSubmit() {
    try {
      const response = await this.crmHabService.updateHabitacion(this.habId, this.editFormHab.value);
      Swal.fire('Actualizar Habitación', 'La habitación se ha actualizado correctamente', 'success')
      this.router.navigate(['dashboard/habitaciones'])
      console.log(response)

    } catch (error) {
      Swal.fire('Actualizar Habitación', 'Ha habido un problema con tu petición', 'error')
      console.log(error)
    }



  }
  checkError(fieldsName: string, errorName: string) {
    return this.editFormHab.get(fieldsName)?.hasError(errorName) && this.editFormHab.get(fieldsName)?.touched
  }
}

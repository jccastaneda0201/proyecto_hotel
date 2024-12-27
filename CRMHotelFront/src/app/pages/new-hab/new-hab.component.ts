import { Component, inject } from '@angular/core';
import { CheckboxRequiredValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CrmHabsService } from '../../services/crm-habs.service';

@Component({
  selector: 'app-new-hab',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-hab.component.html',
  styleUrl: './new-hab.component.css'
})
export class NewHabComponent {

  router = inject(Router)
  arrErrores: { field: String, message: String }[] = []
  crmHabService = inject(CrmHabsService)

  newHabForm: FormGroup = new FormGroup({
    piso: new FormControl(null, [Validators.required]),
    puerta: new FormControl(null, [Validators.required]),
    mascotas: new FormControl("", [Validators.required]),
    num_camas: new FormControl("", [Validators.required]),
    categoria: new FormControl("", [Validators.required]),
    precio: new FormControl(null, [Validators.required]),
    tamanho: new FormControl("", [Validators.required]),
    vista: new FormControl("", [Validators.required]),
    cocina: new FormControl("", [Validators.required])
  });
  checkError(fieldsName: string, errorName: string) {
    return this.newHabForm.get(fieldsName)?.hasError(errorName) && this.newHabForm.get(fieldsName)?.touched
  }
  async onSubmit() {
    if (this.newHabForm.valid) {
      try {
        const newHab = await this.crmHabService.createHabitacion(this.newHabForm.value)
        console.log(newHab)
        Swal.fire({ title: 'Nueva habitación', text: 'La habitación se ha creado con éxito', icon: 'success' });
        this.router.navigateByUrl('/dashboard/habitaciones')
        console.log(newHab)

      } catch ({ error }: any) {
        Swal.fire({ title: 'Nueva habitación', text: 'Ha habido un error con tu solicitud', icon: 'error' });
        console.log(error)
      }

    }
  }
}


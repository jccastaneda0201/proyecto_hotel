import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservasService } from '../../services/reservas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-reservas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-reservas.component.html',
  styleUrl: './formulario-reservas.component.css'
})
export class FormularioReservasComponent {

  busqueda: any;
  habitacionId: any;

  reservasService = inject(ReservasService);
  router = inject(Router);


  formulario: FormGroup = new FormGroup({
    regimen: new FormControl(null, [Validators.required]),
    tipo_cancelacion: new FormControl(null, [Validators.required]),
    aparcamiento: new FormControl(false),
    desayuno: new FormControl(null, [Validators.required]),
    spa: new FormControl(false),
    gimnasio: new FormControl(false),
    piscina: new FormControl(false),
    metodo_pago: new FormControl(null, [Validators.required]),
  })

  checkError(fieldName: string, errorName: string) {
    return this.formulario.get(fieldName)?.hasError(errorName) && this.formulario.get(fieldName)?.touched
  }

  ngOnInit() {
    this.busqueda = JSON.parse(localStorage.getItem("busqueda")!);
    this.habitacionId = JSON.parse(localStorage.getItem("habitacion_seleccionada")!);
    console.log(this.busqueda);
  }

  crearReserva() {
    if (this.formulario.valid) {
      const nuevaReserva = {
        ...this.formulario.value,
        fecha_entrada: this.busqueda.llegada,
        fecha_salida: this.busqueda.salida,
        num_personas: this.busqueda.num_personas,
        habitacion_id: this.habitacionId,
      }

      this.reservasService.createReserva(nuevaReserva)

      Swal.fire({
        title: 'Reserva realizada con éxito',
        text: '¡Revisa tu correo para ver todos los detalles de tu reserva!',
        icon: 'success',
        iconColor: 'var(--color-primario)',
        confirmButtonColor: 'var(--color-primario)'
      })

      this.router.navigateByUrl('/misreservas')
    }
  }
}





import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Habitacion from '../../interfaces/habitacion.interface';
import { CrmHabsService } from '../../services/crm-habs.service';
import { RouterLink } from '@angular/router';
import { CrmhabscardComponent } from "../../components/crmhabscard/crmhabscard.component";

@Component({
  selector: 'app-crm-habitaciones',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CrmhabscardComponent],
  templateUrl: './crm-habitaciones.component.html',
  styleUrl: './crm-habitaciones.component.css'
})
export class CrmHabitacionesComponent {


  arrHabitaciones: Habitacion[] = []

  crmHabsService = inject(CrmHabsService)

  formulariofecha: FormGroup = new FormGroup({
    fechaentrada: new FormControl(''),
    fechasalida: new FormControl('')
  })

  filtroDni: FormGroup = new FormGroup({
    dni: new FormControl('')
  })

  filtroPlanta: FormGroup = new FormGroup({
    piso: new FormControl('')
  })

  filtrocat: FormGroup = new FormGroup({
    categoria: new FormControl('')
  })

  filtroubi: FormGroup = new FormGroup({
    vista: new FormControl('')
  })


  async ngOnInit() {
    try {
      const response = await this.crmHabsService.getAllHabitaciones()
      this.arrHabitaciones = response
      console.log(this.arrHabitaciones)
    } catch (error) {
      console.log(error)

    };

  }
  async onHabitacionBorrada() {
    try {
      this.arrHabitaciones = await this.crmHabsService.getAllHabitaciones()
    } catch (error) {
      console.log(error)
    }
  }


  /*   async filtrarFecha() {
      try {
        const { fechaentrada, fechasalida } = this.formulariofecha.value;
        const response = await this.crmHabsService.getHabitacionesByFecha(fechaentrada, fechasalida);
        this.arrHabitaciones = response;
      } catch (error) {
        console.log(error)
      }
    } */

  async filtrarPlanta() {
    try {

      const response = await this.crmHabsService.getHabByPiso(this.filtroPlanta.value.piso);
      this.arrHabitaciones = response;
      console.log(this.arrHabitaciones)
    } catch (error) {
      console.log(error)
    }
  }
  async filtrarCategoria() {
    try {

      const categoria = this.filtrocat.value.categoria;
      if (this.filtrocat.value.categoria === '') {
        this.arrHabitaciones = await this.crmHabsService.getAllHabitaciones();
        return;
      }
      const response = await this.crmHabsService.getHabByCategoria(categoria);
      this.arrHabitaciones = response;
      console.log(this.arrHabitaciones)
    } catch (error) {
      console.log(error)
    }
  }

  async filtrarUbicacion() {
    try {
      const vista = this.filtroubi.value.vista;
      if (this.filtroubi.value.vista === '') {
        this.arrHabitaciones = await this.crmHabsService.getAllHabitaciones();
        return;
      }
      const response = await this.crmHabsService.getHabByVista(vista);
      this.arrHabitaciones = response;
      console.log(this.arrHabitaciones)
    } catch (error) {
      console.log(error)
    }
  }

}

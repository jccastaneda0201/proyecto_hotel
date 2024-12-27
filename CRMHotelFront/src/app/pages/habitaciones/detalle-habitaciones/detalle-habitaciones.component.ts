import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HabitacionesService } from '../../../services/habitaciones.service';
import Habitacion, { Details } from '../../../interfaces/habitacion.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-detalle-habitaciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle-habitaciones.component.html',
  styleUrl: './detalle-habitaciones.component.css'
})
export class DetalleHabitacionesComponent {

  habitacionesService = inject(HabitacionesService);

  @Input() habitacionId: number = 0;



  habitacion: Habitacion | null = null;

  rutasImagenes: string[] = [];



  arrDetails: Details[] = [
    { category: 'deluxe', detail: 'Esta espectacular Habitación de 400 m² hace gala de una elegante combinación de arte, diseño y tecnología. El espacio se distribuye en un amplio salón y un comedor para disfrutar de una mayor privacidad. Además, la suite cuenta con una pequeña cocina y una cómoda zona de trabajo. Relájese en el maravilloso dormitorio con su gran vestidor o en el lujoso baño. La terraza de 220 m² permite celebrar eventos privados y los grandes ventanales llenan la sala de luz natural.' },

    { category: 'premium', detail: 'Alójese en esta habitación de 33 m², la preferida de nuestros huéspedes. Conéctese a nuestro wifi de alta velocidad tomando un Nespresso recién hecho. Elija si prefiere balcón o terraza con vistas y el tipo de cama, según la disponibilidad. Existen habitaciones adaptadas para personas con movilidad reducida.' },

    { category: 'standard', detail: 'Esta habitación de estilo clásico es ideal para cualquier tipo de estancia y ofrece el máximo nivel de confort en el corazón de la ciudad. Los servicios que ofrece garantizan una experiencia de lo más agradable: Conexión con wifi de alta velocidad y servicio de té y café dentro de la habitación.' }

  ]


  async ngOnInit() {
    try {
      // Obtener la habitación desde el servicio
      this.habitacion = await this.habitacionesService.getById(this.habitacionId);
      console.log(this.habitacion);
      // Obtener las imágenes de la habitación
      if (this.habitacion && this.habitacion.imagenes) {
        this.rutasImagenes = this.habitacion.imagenes.map(imagen => imagen.ruta);
        console.log(this.rutasImagenes);
      }

    } catch (error) {
      console.log(error);
    }
  }

  getCocinaStatus(cocina: boolean): string {
    return cocina ? 'Incluye' : 'No incluye';
  }

  getMascotasStatus(cocina: boolean): string {
    return cocina ? 'No permitidas' : 'Permitidas';
  }

  getVistaStatus(vista: string): string {
    if (vista === 'int') {
      return 'Interior';
    } else if (vista === 'ext') {
      return 'Exterior';
    }
    return 'Vista desconocida'; // En caso de un valor inesperado
  }

  getDetailForCategory(category: string): string {
    const feature = this.arrDetails.find(detail => detail.category === category);
    return feature ? feature.detail : 'Detalle no disponible';
  }

}

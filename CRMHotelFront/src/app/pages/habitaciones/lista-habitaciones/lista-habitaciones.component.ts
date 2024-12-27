import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HabitacionesService } from '../../../services/habitaciones.service';
import Habitacion, { Details, Features } from '../../../interfaces/habitacion.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-habitaciones',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './lista-habitaciones.component.html',
  styleUrl: './lista-habitaciones.component.css'
})

export class ListaHabitacionesComponent {

  @Input() habitacionId: number = 0;

  router = inject(Router)

  habitacionesService = inject(HabitacionesService);
  Habitacion: Habitacion[] = [];
  arrHabitaciones: Habitacion[] = [];

  imagenesPorHabitacion: { id: number; rutasImagenes: string[] }[] = [];
  rutasImagenes: string[] = [];


  arrDetails: Details[] = [
    { category: 'deluxe', detail: 'Esta espectacular Habitación de 400 m² hace gala de una elegante combinación de arte, diseño y tecnología. El espacio se distribuye en un amplio salón y un comedor para disfrutar de una mayor privacidad. Además, la suite cuenta con una pequeña cocina y una cómoda zona de trabajo. Relájese en el maravilloso dormitorio con su gran vestidor o en el lujoso baño. La terraza de 220 m² permite celebrar eventos privados y los grandes ventanales llenan la sala de luz natural.' },

    { category: 'premium', detail: 'Alójese en esta habitación de 33 m², la preferida de nuestros huéspedes. Conéctese a nuestro wifi de alta velocidad tomando un Nespresso recién hecho. Elija si prefiere balcón o terraza con vistas y el tipo de cama, según la disponibilidad. Existen habitaciones adaptadas para personas con movilidad reducida.' },

    { category: 'standard', detail: 'Esta habitación de estilo clásico es ideal para cualquier tipo de estancia y ofrece el máximo nivel de confort en el corazón de la ciudad. Los servicios que ofrece garantizan una experiencia de lo más agradable: Conexión con wifi de alta velocidad y servicio de té y café dentro de la habitación. Elija el tipo de cama que prefiera, según la disponibilidad.' }

  ]

  roomDeluxe: Features[] = [
    { icon: 'fi fi-rr-screen', label: 'Smart TV' },
    { icon: 'fi fi-bs-wifi', label: 'Wi-Fi' },
    { icon: 'fi fi-rr-mug-hot-alt', label: 'Desayuno Buffet' },
    { icon: 'fi fi-rs-air-conditioner', label: 'Aire acondicionado' },
    { icon: 'fi fi-sr-room-service', label: 'Room Service' },
    { icon: 'fi fi-rr-paw-heart', label: 'Pet Friendly' },
    { icon: 'fi fi-rs-martini-glass-citrus', label: 'Bar' },
    { icon: 'fi fi-br-restaurant', label: 'Restaurante' },
    { icon: 'fi fi-rr-candle-lotus-yoga', label: 'Spa' },
    { icon: 'fi fi-br-swimmer', label: 'Piscina' },
    { icon: 'i fi-rs-dumbbell-fitness', label: 'Gimnasio' },
    { icon: 'fi fi-rr-car', label: 'Parking' },
    { icon: 'fi fi-rr-bell', label: 'Recepción 24h' }


  ];

  roomPremium: Features[] = [
    { icon: 'fi fi-rr-screen', label: 'Smart TV' },
    { icon: 'fi fi-bs-wifi', label: 'Wi-Fi' },
    { icon: 'fi fi-rr-mug-hot-alt', label: 'Desayuno Buffet' },
    { icon: 'fi fi-rs-air-conditioner', label: 'Aire acondicionado' },
    { icon: 'fi fi-rr-paw-heart', label: 'Pet Friendly' },
    { icon: 'fi fi-rr-candle-lotus-yoga', label: 'Spa' },
    { icon: 'fi fi-br-swimmer', label: 'Piscina' },
    { icon: 'i fi-rs-dumbbell-fitness', label: 'Gimnasio' },
    { icon: 'fi fi-rr-car', label: 'Parking' },
    { icon: 'fi fi-rr-bell', label: 'Recepción 24h' }

  ];

  roomEstandar: Features[] = [
    { icon: 'fi fi-rr-screen', label: 'Smart TV' },
    { icon: 'fi fi-bs-wifi', label: 'Wi-Fi' },
    { icon: 'fi fi-rr-mug-hot-alt', label: 'Desayuno Buffet' },
    { icon: 'fi fi-rs-air-conditioner', label: 'Aire acondicionado' },
    { icon: 'fi fi-rr-paw-heart', label: 'Pet Friendly' },
    { icon: 'fi fi-br-swimmer', label: 'Piscina' },
    { icon: 'fi fi-rr-car', label: 'Parking' },
    { icon: 'fi fi-rr-bell', label: 'Recepción 24h' }
  ];

  reserva: FormGroup = new FormGroup(
    {
      llegada: new FormControl(),
      salida: new FormControl(),
      num_personas: new FormControl(),
    })


  onSubmit() {

    localStorage.setItem('busqueda', JSON.stringify(this.reserva.value));
    this.router.navigate(['/busqueda']);
  }

  async ngOnInit() {
    try {
      // Obtener todas las habitaciones
      this.Habitacion = await this.habitacionesService.getAll();
      console.log(this.Habitacion);

      // Mapear habitaciones con imágenes y almacenar ID y rutas
      this.imagenesPorHabitacion = this.Habitacion.map(habitacion => ({
        id: habitacion.id,
        rutasImagenes: habitacion.imagenes ? habitacion.imagenes.map(imagen => imagen.ruta) : []
      }));

      console.log(this.imagenesPorHabitacion); // Rutas de imágenes organizadas por ID

      // Extraer las rutas de las imágenes en un solo array
      this.rutasImagenes = this.imagenesPorHabitacion.flatMap(habitacion => habitacion.rutasImagenes);
      console.log(this.rutasImagenes);  // Rutas de imágenes

    } catch (error) {
      console.log(error);
    }
  }

  getImagenPorId(id: number): string {
    const habitacion = this.imagenesPorHabitacion.find(h => h.id === id);
    return habitacion && habitacion.rutasImagenes.length > 0 ? habitacion.rutasImagenes[0] : 'ruta/por/defecto.jpg';
  }

  getDetailForCategory(category: string, wordLimit: number = 16): string {
    const feature = this.arrDetails.find(detail => detail.category === category);
    if (!feature) {
      return 'Detalle no disponible';
    }
    const words = feature.detail.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : feature.detail;
  }


  getIconsByCategory(categoria: string): Features[] {
    switch (categoria.toLowerCase()) {
      case 'deluxe':
        return this.roomDeluxe;
      case 'premium':
        return this.roomPremium;
      case 'standard':
        return this.roomEstandar;
      default:
        return [];
    }
  }
  selectIcons(servicio: Features) {
    console.log('Servicio seleccionado:', servicio);
  }


  getCocinaStatus(cocina: boolean): string {
    return cocina ? 'Incluye' : 'No incluye';
  }

  getVistaStatus(vista: string): string {
    if (vista === 'int') {
      return 'Interior';
    } else if (vista === 'ext') {
      return 'Exterior';
    }
    return 'Vista desconocida'; // En caso de un valor inesperado
  }

}


import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import Habitacion from '../interfaces/habitacion.interface';
import { Images } from '../interfaces/images.interface';

type createHab = {
  piso: number;
  puerta: number;
  mascotas: boolean;
  num_camas: string;
  categoria: string;
  precio: number;
  tamanho: string;
  vista: string;
  cocina: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class CrmHabsService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/habitaciones`;

  getAllHabitaciones(): Promise<Habitacion[]> {
    return lastValueFrom(
      this.httpClient.get<Habitacion[]>(`${this.baseUrl}`)
    )
  }
  getHabById(habId: number): Promise<Habitacion> {
    return lastValueFrom(
      this.httpClient.get<Habitacion>(`${this.baseUrl}/${habId}`)
    )
  }
  /* 
    hetHabitacionesByFecha(fechaentrada: string, fechasalida: string): Promise<Habitacion[]> { return lastValueFrom(this.httpClient.get<Habitacion[]>(`${this.baseUrl}/fecha/${fechaentrada}/${fechasalida}`)) } */

  getHabByPiso(piso: number): Promise<Habitacion[]> {
    return lastValueFrom(this.httpClient.get<Habitacion[]>(`${this.baseUrl}/piso/${piso}`))
  }

  getHabByCategoria(categoria: string): Promise<Habitacion[]> {
    return lastValueFrom(
      this.httpClient.get<Habitacion[]>(`${this.baseUrl}/categoria/${categoria}`))
  }

  getHabByVista(vista: string): Promise<Habitacion[]> {
    return lastValueFrom(
      this.httpClient.get<Habitacion[]>(`${this.baseUrl}/vista/${vista}`))
  }

  createHabitacion(body: createHab): Promise<Habitacion> {
    return lastValueFrom(
      this.httpClient.post<Habitacion>(`${this.baseUrl}`, body)
    )

  }

  subirImagen(habId: number, imagen: FormData) {
    return lastValueFrom(
      this.httpClient.post<Habitacion>(`${this.baseUrl}/imagenes/${habId}`, imagen)
    )
  }

  deleteImagen(imagenId: number): Promise<Images> {
    return lastValueFrom(
      this.httpClient.delete<Images>(`${this.baseUrl}/imagenes/${imagenId}`)
    )
  }
  updateHabitacion(habId: number, body: createHab): Promise<Habitacion> {
    return lastValueFrom(
      this.httpClient.put<Habitacion>(`${this.baseUrl}/${habId}`, body)
    )
  }
  deleteHabitacion(habId: number): Promise<Habitacion> {
    return lastValueFrom(
      this.httpClient.delete<Habitacion>(`${this.baseUrl}/${habId}`)
    )
  }
}

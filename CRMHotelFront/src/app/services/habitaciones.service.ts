import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Habitacion from '../interfaces/habitacion.interface';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

type CreateBody = {
  id: number;
  piso: number;
  puerta: number;
  mascotas: boolean;
  num_camas: string;
  categoria: string;
  precio: number;
  tamanho: string;
  vista: string;
  cocina: boolean
}

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/habitaciones`;


  getAll(): Promise<Habitacion[]> {
    return lastValueFrom(
      this.httpClient.get<Habitacion[]>(this.baseUrl)
    )
  }
  getById(habitacionID: number): Promise<Habitacion> {
    console.log(habitacionID);
    return lastValueFrom(
      this.httpClient.get<Habitacion>(`${this.baseUrl}/${habitacionID}`)
    )

  }
  create(body: CreateBody): Promise<Habitacion[]> {
    return lastValueFrom(
      this.httpClient.post<Habitacion[]>(this.baseUrl, body)
    );
  }
  deleteById(empleadoId: string) {
    return lastValueFrom(
      this.httpClient.delete<Habitacion>(`${this.baseUrl}`)
    );
  }

  isAdmin(): boolean {

    {
      return false;
    }
    return true;
  }

  getBusqueda(fecha_entrada: string, fecha_salida: string): Promise<Habitacion[]> {
    return lastValueFrom(
      this.httpClient.get<Habitacion[]>(`${this.baseUrl}/busqueda/${fecha_entrada}/${fecha_salida}`)
    )
  }

}

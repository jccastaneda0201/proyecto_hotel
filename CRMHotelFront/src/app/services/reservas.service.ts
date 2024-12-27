import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Reserva } from '../interfaces/reserva';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private httpClient = inject(HttpClient);

  private url: string = `${environment.apiUrl}/reservas`;


  getAll(): Promise<Reserva[]> {
    return lastValueFrom(
      this.httpClient.get<Reserva[]>(`${this.url}`))
  }

  filterByFechas(fechaInicio: Date, fechaFin: Date): Promise<Reserva[]> {
    return lastValueFrom(
      this.httpClient.get<Reserva[]>(`${this.url}/fecha/${fechaInicio}/${fechaFin}`))
  }

  filterByDni(dni: string): Promise<Reserva[]> {
    return lastValueFrom(
      this.httpClient.get<Reserva[]>(`${this.url}/dni/${dni}`))
  }

  filterById(resId: number): Promise<Reserva> {
    return lastValueFrom(
      this.httpClient.get<Reserva>(`${this.url}/${resId}`))
  }

  createReserva(body: Reserva): Promise<Reserva> {
    return lastValueFrom(
      this.httpClient.post<Reserva>(`${this.url}`, body))
  }
  editReserva(resId: number, body: Reserva): Promise<Reserva> {
    return lastValueFrom(
      this.httpClient.put<Reserva>(`${this.url}/edit/${resId}`, body))
  }

  cancelarReserva(resId: number): Promise<Reserva> {
    return lastValueFrom(
      this.httpClient.put<Reserva>(`${this.url}/cancelar/${resId}`, {}))
  }

  getReservasByUser(): Promise<Reserva[]> {
    return lastValueFrom(
      this.httpClient.get<Reserva[]>(`${this.url}/misreservas`))
  }
}

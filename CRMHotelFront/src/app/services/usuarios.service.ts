import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interfaces';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../guards/admin.guard';

type LoginBody = { email: string, password: string };
type ResponseLogin = { message: string, token: string };
type userBody = { nombre: string, apellidos: string, username: string, email: string, password: string, dni: string, telefono: string, ciudad: string, pais: string, cod_postal: string, fecha_nacimiento: string, direccion: string }

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private httpClient = inject(HttpClient);

  private url: string = `${environment.apiUrl}/usuarios`;

  login(body: LoginBody) {
    return lastValueFrom(
      this.httpClient.post<ResponseLogin>
        (`${this.url}/login`, body));
  }

  registro(body: Usuario): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.post<Usuario>(`${this.url}/registro`, body)
    )
  }

  islogged(): boolean {
    if (localStorage.getItem('hotel_token')) {
      return true
    } else {
      return false
    }
  }

  isAdmin(): boolean {

    const token = localStorage.getItem('hotel_token');
    if (!token) {
      return false
    }

    const data = jwtDecode<CustomPayload>(token!);

    if (data.usuario_rol === 'admin') {
      return true
    }
    return false
  }



  getUserSinId(): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.get<Usuario>(`${this.url}/logeado`)
    )
  }
  updateUsuario(body: userBody): Promise<Usuario> {
    return lastValueFrom(
      this.httpClient.put<Usuario>(`${this.url}/edit/`, body)
    )
  }
}

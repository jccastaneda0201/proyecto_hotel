import { CanActivateFn } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface CustomPayload extends JwtPayload {
  usuario_rol: string,
  usuario_id: number
}

export const adminGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('hotel_token')
  const data = jwtDecode<CustomPayload>(token!)

  if (data.usuario_rol !== 'admin') {
    return false
  }

  return true;
};

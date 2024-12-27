import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuariosService = inject(UsuariosService)
  usuario: Usuario | null = null
  router = inject(Router)

  async onClickLogOut() {
    try {
      const result = await Swal.fire({ title: 'Cerrar Sesión', text: '¿Quiere cerrar sesión?', icon: 'question', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' })
      if (result.isConfirmed) {
        localStorage.removeItem('hotel_token')
        this.router.navigateByUrl('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

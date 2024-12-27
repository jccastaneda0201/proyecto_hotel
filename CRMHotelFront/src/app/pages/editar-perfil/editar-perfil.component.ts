import { Component, Inject, inject, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }
  usuarioService = inject(UsuariosService)
  router = inject(Router)
  usuario: Usuario | null = null


  editForm: FormGroup = new FormGroup({

    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñÑ]{2,}$/)]),

    dni: new FormControl(null, [Validators.required, Validators.pattern(/^\d{8}[A-Za-z]$/)]),
    telefono: new FormControl(null, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    ciudad: new FormControl(null, [Validators.required]),
    pais: new FormControl(null, [Validators.required]),
    cod_postal: new FormControl(null, [Validators.required]),
    fecha_nacimiento: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required])

  })
  async ngOnInit() {
    this.document.body.classList.add('fondo-login');

    try {
      this.usuario = await this.usuarioService.getUserSinId()
      console.log(this.usuario)
      this.editForm.setValue({

        nombre: this.usuario.nombre,
        apellidos: this.usuario.apellidos,
        username: this.usuario.username,
        email: this.usuario.email,
        direccion: this.usuario.direccion,
        dni: this.usuario.dni,
        telefono: this.usuario.telefono,
        ciudad: this.usuario.ciudad,
        pais: this.usuario.pais,
        cod_postal: this.usuario.cod_postal,
        fecha_nacimiento: this.usuario.fecha_nacimiento
      })

    } catch (error) {
      console.log(error)
    }
  }
  ngOnDestroy() {
    this.document.body.classList.remove('fondo-login');
  }
  checkError(fieldName: string, errorName: string) {
    return this.editForm.get(fieldName)?.hasError(errorName) && this.editForm.get(fieldName)?.touched
  }


  async onSubmit() {
    this.editForm.markAllAsTouched();
    try {
      const response = await this.usuarioService.updateUsuario(this.editForm.value)
      console.log(response)
      Swal.fire({ title: 'Editar Usuario', text: '¡Usuario editado con éxito!', icon: 'success' });
      this.router.navigateByUrl('')

    } catch (error) {
      Swal.fire({ title: 'Editar Usuario', text: 'Lo sentimos, ha habido un problema con tu solicitud', icon: 'error' });
      this.router.navigateByUrl('')
      console.log(error)
    }

  }
}




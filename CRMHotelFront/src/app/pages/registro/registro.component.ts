import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  UsuariosServie = inject(UsuariosService)
  router = inject(Router)

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñÑ]{2,}$/)]),
    password: new FormControl(null, [Validators.required]),
    dni: new FormControl(null, [Validators.required, Validators.pattern(/^\d{8}[A-Za-z]$/)]),
    telefono: new FormControl(null, [Validators.required, Validators.pattern(/^\d{9}$/)]),
    ciudad: new FormControl(null, [Validators.required]),
    pais: new FormControl(null, [Validators.required]),
    cod_postal: new FormControl(null, [Validators.required]),
    fecha_nacimiento: new FormControl(null, [Validators.required]),
    direccion: new FormControl(null, [Validators.required])
  });


  ngOnInit() {
    this.document.body.classList.add('fondo-login');
  }
  ngOnDestroy() {
    this.document.body.classList.remove('fondo-login');
  }
  checkError(fieldName: string, errorName: string) {
    return this.formulario.get(fieldName)?.hasError(errorName) && this.formulario.get(fieldName)?.touched
  }

  async onSubmit() {
    this.formulario.markAllAsTouched();
    try {
      const response = await this.UsuariosServie.registro(this.formulario.value)
      console.log(response)
      Swal.fire({ title: 'Nuevo Usuario', text: 'Enhorabuena, ya perteneces a nuestra familia ♥️', icon: 'success' });
      this.router.navigateByUrl('/login')

    } catch (error) {
      Swal.fire({ title: 'Nuevo Usuario', text: 'Lo sentimos, ha habido un problema con tu solicitud', icon: 'error' });
      this.router.navigateByUrl('/login')
      console.log(error)
    }

  }


}

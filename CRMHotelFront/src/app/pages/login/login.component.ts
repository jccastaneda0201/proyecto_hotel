import { DOCUMENT } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  UsuarioService = inject(UsuariosService);
  router = inject(Router);

  formulario: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñÑ]{2,}$/)]),

    password: new FormControl(null, [
      Validators.required
    ])

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
      const response = await this.UsuarioService.login(this.formulario.value);
      localStorage.setItem('hotel_token', response.token)
      this.router.navigateByUrl('/')
    } catch (error) {
      /* alerta */
    }
  }

}

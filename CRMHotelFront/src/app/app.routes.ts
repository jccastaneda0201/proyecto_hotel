import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaHabitacionesComponent } from './pages/habitaciones/lista-habitaciones/lista-habitaciones.component';
import { NuevaHabitacionComponent } from './pages/habitaciones/nueva-habitacion/nueva-habitacion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrmReservasComponent } from './pages/crm-reservas/crm-reservas.component';
import { CrmHabitacionesComponent } from './pages/crm-habitaciones/crm-habitaciones.component';
import { MainComponent } from './pages/main/main.component';
import { CrmDetalleReservaComponent } from './pages/crm-detalle-reserva/crm-detalle-reserva.component';
import { NewHabComponent } from './pages/new-hab/new-hab.component';
import { EditHabComponent } from './pages/edit-hab/edit-hab.component';
import { DetalleHabcrmComponent } from './pages/detalle-habcrm/detalle-habcrm.component';
import { QuienessomosComponent } from './pages/quienessomos/quienessomos.component';
import { SpaComponent } from './pages/spa/spa.component';
import { DetalleHabitacionesComponent } from './pages/habitaciones/detalle-habitaciones/detalle-habitaciones.component';

import { FormularioReservasComponent } from './pages/formulario-reservas/formulario-reservas.component';
import { BusquedaHabitacionesComponent } from './pages/busqueda-habitaciones/busqueda-habitaciones.component';
import { EditReservaComponent } from './pages/edit-reserva/edit-reserva.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';



export const routes: Routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            { path: "", component: HomeComponent },
            { path: 'habitaciones', component: ListaHabitacionesComponent },
            { path: 'crearHabitacion', component: NuevaHabitacionComponent },
            { path: 'habitaciones/:habitacionId', component: DetalleHabitacionesComponent },
            { path: 'reservas', component: FormularioReservasComponent },
            { path: 'misreservas', component: MisReservasComponent },
            { path: 'nosotros', component: QuienessomosComponent },
            { path: 'spa', component: SpaComponent },
            { path: 'habitaciones/:habitacionId', component: DetalleHabcrmComponent },
            { path: 'busqueda', component: BusquedaHabitacionesComponent }

        ],
    },

    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'editusuario', component: EditarPerfilComponent },

    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'reservas', pathMatch: 'full' },
            { path: 'reservas', component: CrmReservasComponent },
            { path: 'reservas/:id', component: CrmDetalleReservaComponent },
            { path: 'reservas/edit/:resId', component: EditReservaComponent },
            { path: 'habitaciones', component: CrmHabitacionesComponent },
            { path: '', component: CrmDetalleReservaComponent },
            { path: 'habitaciones/new', component: NewHabComponent },
            { path: 'habitaciones/edit/:habId', component: EditHabComponent },
            { path: 'habitaciones/detalle/:habId', component: DetalleHabcrmComponent }
        ],
    },
    { path: '**', redirectTo: '' }
];

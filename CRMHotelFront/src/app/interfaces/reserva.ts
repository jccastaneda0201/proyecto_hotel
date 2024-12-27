import { Usuario } from "./usuario.interfaces";

export interface Reserva {
    id: number;
    fecha_entrada: Date;
    fecha_salida: Date;
    puntuacion: number;
    usuarios_id: number;
    num_personas: number;
    num_habitaciones: string;
    regimen: string;
    tipo_cancelacion: string;
    aparcamiento: boolean;
    desayuno: boolean;
    spa: boolean;
    gimnasio: boolean;
    piscina: boolean;
    precio: number;
    metodo_pago: string;
    estado: string;
    usuario: Usuario;

}

import { Observable } from "rxjs";
import { PruebaI } from "../models/prueba/prueba.model"; 

export interface PruebaPort {
    findAll: () => Observable<PruebaI>;
}
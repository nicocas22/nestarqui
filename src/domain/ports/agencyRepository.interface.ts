import { Agency } from "../models/agency/agency.model";
import { AgenciaResponse } from "../models/agency/agencyResponse";


export interface AgencyRepository {
    findByID: (id: number) => Promise<AgenciaResponse>;
    findAll: () => Promise<Agency[]>;
    consultaUbicacion: (codigoAgencia: number) => Promise<any>;
}
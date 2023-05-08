import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AgencyRepository } from 'src/domain/ports/agencyRepository.interface';
import { AgenciaResponse } from "../../../domain/models/agency/agencyResponse";


//Ocupar este documento para generar las consultas que se utilizaran desde Los PLM
@Injectable()
export class AgencyRepositorys implements AgencyRepository {
    constructor(

    ) { }

    async findAll() {
        try {
  
            return null;
        } catch (error) {
            throw new HttpException(
                {
                    statusbar: HttpStatus.INTERNAL_SERVER_ERROR,
                    Error: 'Ocurrio un problema al obtener agencias',
                },
                500,
            );
        }
    }


    async findByID(id: number): Promise<AgenciaResponse> {
        try {
                return null;
        } catch (error) {
            throw new HttpException(
                {
                    statusbar: HttpStatus.INTERNAL_SERVER_ERROR,
                    Error: 'Ocurrio un problema al obtener agencia',
                },
                500,
            );
        }
    }

    consultaUbicacion:(codigoAgencia: number) => Promise<any> 

    
}
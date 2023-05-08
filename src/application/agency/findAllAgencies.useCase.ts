import { AgenciaResponse } from "../../domain/models/agency/agencyResponse";
import { AgencyRepository } from "../../domain/ports/agencyRepository.interface";
import { IException } from '../../domain/exceptions/exception.interface';




export class FindAllAgenciesUseCase {
    constructor(
        private readonly agencyRepository: AgencyRepository,
        private readonly exceptionService: IException,
    ) { }
    async run() {
        try {
            let mock =  {
                "id": 12,
                "name": "Nono" };

            return mock;
        } catch (error) {
            this.exceptionService.internalServerErrorException({
                message: 'Ocurrio un problema al obtener agencias',
                codeError: 500,
            });
        }
    }

}
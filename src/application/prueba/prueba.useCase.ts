import { IException } from '../../domain/exceptions/exception.interface';
import {PruebaPort} from '../../domain/ports/prueba.port'



export class FindAllAgenciesUseCase {
    constructor(
        private readonly pruebaPort: PruebaPort,
        private readonly exceptionService: IException,
    ) { }
    async run() {
        try {
            let mock =  {
                "id": 12,
                "name": "Nono" };
                this.pruebaPort.findAll()
            return mock;
        } catch (error) {
            this.exceptionService.internalServerErrorException({
                message: 'Ocurrio un problema al obtener agencias',
                codeError: 500,
            });
        }
    }

}
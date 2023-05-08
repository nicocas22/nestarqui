import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AgenciaResponse } from "../../domain/models/agency/agencyResponse";
import { AgencyUsecasesProxyModule } from '../useCasesProxy/agencyUseCasesProxy.module';
import { UseCaseProxy } from '../useCasesProxy/useCasesProxy';
import { FindAllAgenciesUseCase } from '../../application/agency/findAllAgencies.useCase';




@ApiTags('Servicios Destinos')
@Controller('destinos')
export class AgencyController {
    constructor(
        @Inject(AgencyUsecasesProxyModule.FIND_ALL_AGENCIES_USECASE_PROXY)
        private readonly findAllAgenciesUseCaseProxy: UseCaseProxy<FindAllAgenciesUseCase>,
    ) { }

    @Get()
    getAgency(): Promise<AgenciaResponse> {
        return this.findAllAgenciesUseCaseProxy.getInstance().run();
    }
}

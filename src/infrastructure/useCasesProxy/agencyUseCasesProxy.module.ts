import { DynamicModule, Module } from "@nestjs/common";
import { RepositoriesModule as PostgreRepositoriesModule } from "../persistence/services/repositories.module";
import { ExceptionsModule } from "../exceptions/exceptions.module";
import { UseCaseProxy } from "./useCasesProxy";
import { FindAllAgenciesUseCase } from '../../application/agency/findAllAgencies.useCase';
import { AgencyRepositorys } from "../persistence/services/AgencyRepository";
import { ExceptionService } from '../exceptions/exception.service';


@Module({
    imports: [PostgreRepositoriesModule, ExceptionsModule],
})
export class AgencyUsecasesProxyModule {
    static FIND_ALL_AGENCIES_USECASE_PROXY = 'FindAllAgenciesUseCaseProxy';
    static register(): DynamicModule {
        return {
            module: AgencyUsecasesProxyModule,
            providers: [
                {
                    inject: [AgencyRepositorys, ExceptionService],
                    provide: AgencyUsecasesProxyModule.FIND_ALL_AGENCIES_USECASE_PROXY,
                    useFactory: (
                        agencyRepository: AgencyRepositorys,
                        exceptionService: ExceptionService
                    ) => new UseCaseProxy(new FindAllAgenciesUseCase(agencyRepository, exceptionService))
                },
            ],
            exports: [
                AgencyUsecasesProxyModule.FIND_ALL_AGENCIES_USECASE_PROXY
            ],
        }
    }
}
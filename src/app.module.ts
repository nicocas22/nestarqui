
import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { AgencyUsecasesProxyModule } from './infrastructure/useCasesProxy/agencyUseCasesProxy.module';
import { AxiosModule } from './infrastructure/axios/axios.module';


@Module({
  imports: [
    AgencyUsecasesProxyModule.register(),
    ControllersModule,
    ExceptionsModule,
    AxiosModule
  ],
})

export class AppModule { }

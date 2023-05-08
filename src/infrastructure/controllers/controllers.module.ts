import { Module } from '@nestjs/common';

import { AgencyUsecasesProxyModule } from '../useCasesProxy/agencyUseCasesProxy.module';
import { AgencyController } from './agency.controller';


@Module({
    imports: [
        AgencyUsecasesProxyModule.register()
    ],
    controllers: [
        AgencyController,
    ],
})
export class ControllersModule { }

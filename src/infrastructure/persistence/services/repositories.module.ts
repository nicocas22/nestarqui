
import { Module } from '@nestjs/common';

import { AgencyRepositorys } from './AgencyRepository';


@Module({
    providers: [AgencyRepositorys,
    ],
    exports: [AgencyRepositorys,
    ],
})
export class RepositoriesModule { }
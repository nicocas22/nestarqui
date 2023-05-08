import { Module } from "@nestjs/common";
import { ConnectionAxios } from "./axios.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports:[HttpModule],
    providers: [ConnectionAxios],
    exports:[ConnectionAxios]
})
export class AxiosModule {}
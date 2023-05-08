import { Observable } from "rxjs";
import { Idata } from "src/infrastructure/axios/interface/http.interface";

export interface AxiosRepository {
    connect: (data: Idata) => Observable<any>;
}
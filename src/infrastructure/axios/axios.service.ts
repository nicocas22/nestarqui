import { Injectable} from '@nestjs/common'
import { AxiosRepository } from 'src/domain/ports/Axios.port';
import { Idata } from './interface/http.interface'
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ConnectionAxios implements AxiosRepository {
    constructor(private readonly http: HttpService) { }

    connect(data: Idata): Observable<any> {
        switch (data.method.toUpperCase()) {
            case 'GET':
                return this.get(data).pipe(
                    catchError((error) => {
                        console.log(error);
                        return of(error);
                    })
                );
            case 'POST':
                return this.post(data).pipe(
                    catchError((error) => {
                        console.log(error);
                        return of(error);
                    })
                );
            case 'PUT':
                return this.put(data).pipe(
                    catchError((error) => {
                        console.log(error);
                        return of(error);
                    })
                );
            case 'DELETE':
                return this.delete(data).pipe(
                    catchError((error) => {
                        console.log(error);
                        return of(error);
                    })
                );
        }

    }

    private get(data: Idata): Observable<any> {
        const largoData: number = data.params.length
        let url = `${data.url}`;
        if (largoData > 1) {
            const arr = data.params;
            const stringarr = arr.join("/");
            url = `${url}/${stringarr}`;
        } else {
            url = `${url}/${data.params[0]}`;
        }
        return this.http.get(url, { headers: data.headears }).pipe(
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }

    private post(data: Idata): Observable<any> {
        return this.http.post(data.url, data.body, { headers: data.headears }).pipe(
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }

    private put(data: Idata): Observable<any> {
        return this.http.put(data.url, data.body, { headers: data.headears }).pipe(
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }

    private delete(data: Idata): Observable<any> {
        const largoData: number = data.params.length
        let url = `${data.url}`;
        if (largoData > 1) {
            const arr = data.params;
            const stringarr = arr.join("/");
            url = `${url}/${stringarr}`;
        } else {
            url = `${url}/${data.params[0]}`;
        }
        return this.http.delete(url, { headers: data.headears }).pipe(
            catchError((error) => {
                console.log(error);
                return of(error);
            })
        );
    }

}
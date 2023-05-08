import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { PruebaI } from 'src/domain/models/prueba/prueba.model';
import { PruebaPort } from 'src/domain/ports/prueba.port';
import { AxiosRepository } from 'src/domain/ports/Axios.port';
import { Idata } from 'src/infrastructure/axios/interface/http.interface';
//Ocupar este documento para generar las consultas que se utilizaran desde Los PLM
@Injectable()
export class PruebaRepository implements PruebaPort {
    constructor(
        private readonly connectAxios: AxiosRepository
    ) { }

    findAll(): Observable<PruebaI> {
        try {
            const param = ['name'];
            const data: Idata = {
                url: `${process.env.URLAPI}/`,
                method: 'GET',
                params: param,
            };

            this.connectAxios.connect(data).subscribe({
                next: (res) => {
                    console.log(res); // Aquí obtendrás la respuesta de la API
                 
                },
                error: (error) => {
                    console.error(error); // Si hay un error, lo imprimirás aquí
                    throw new HttpException(
                        {
                            statusbar: HttpStatus.INTERNAL_SERVER_ERROR,
                            Error: 'Ocurrio un problema al obtener agencias',
                        },
                        500,
                    );
                },
                complete: () => {
                    console.log('Completado'); // Este método se llama cuando el observable termina
                }
            });
            return null;

        } catch (error) {
            throw new HttpException(
                {
                    statusbar: HttpStatus.INTERNAL_SERVER_ERROR,
                    Error: 'Ocurrio un problema al obtener agencias',
                },
                500,
            );
        }
    }


}
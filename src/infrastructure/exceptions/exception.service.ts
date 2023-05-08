import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { IFormatExceptionMessage, IException } from '../../domain/exceptions/exception.interface';



@Injectable()
export class ExceptionService implements IException {
    badRequestException(data: IFormatExceptionMessage): void {
        if (data.codeError === null)
            data.codeError = 400;

        throw new HttpException({
            codigo: HttpStatus.BAD_REQUEST,
            message: data.message,
        }, data.codeError);
    }

    notFoundErrorException(data: IFormatExceptionMessage) {
        if (data.codeError === null)
            data.codeError = 404;

        throw new HttpException({
            codigo: HttpStatus.NOT_FOUND,
            message: data.message,
        }, data.codeError);
    }
    internalServerErrorException(data: IFormatExceptionMessage): void {
        if (data.codeError === null)
            data.codeError = 500;

        throw new HttpException({
            //codigo: HttpStatus.INTERNAL_SERVER_ERROR,
            codigo: data.codeError,
            message: data.message,
        }, data.codeError);
    }

    noContentErrorException(data: IFormatExceptionMessage): void {
        if (data.codeError === null)
            data.codeError = 204;

        throw new HttpException({
            codigo: HttpStatus.NO_CONTENT,
            message: data.message,
        }, data.codeError);
    }
    notAcceptableException(data: IFormatExceptionMessage) {
        if (data.codeError === null)
            data.codeError = 406;

        throw new HttpException({
            codigo: HttpStatus.NOT_ACCEPTABLE,
            message: data.message,
        }, data.codeError);
    }

    genericException(data: IFormatExceptionMessage) {
        if (data.codeError === null)
            data.codeError = 500;

        throw new HttpException({
            codigo: data.codeError,
            message: data.message,
        }, data.codeError);
    }
}
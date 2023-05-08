export interface IFormatExceptionMessage {
    message: string;
    codeError?: number;
}

export interface IException {
    internalServerErrorException(data: IFormatExceptionMessage): void;
    notFoundErrorException(data: IFormatExceptionMessage): void;
    noContentErrorException(data: IFormatExceptionMessage): void;
    notAcceptableException(data: IFormatExceptionMessage): void;
    badRequestException(data: IFormatExceptionMessage): void;
    genericException(data: IFormatExceptionMessage): void;
}

export enum HttpMethodType {
    POST = 'POST',
    GET = 'GET',
}

export interface RequestContent {
    query?: any;
    body?: any;
}

export interface ConnectionRequest {
    url: string;
    content?: RequestContent;
    method?: HttpMethodType;
    headers?: Record<string, string>;
}

export interface ConnectionResponse<T> {
    httpCode: number;
    headers?: Record<string, string>;
    body?: T | any;
    rawResponse?: any;
    request?: Record<string, unknown>;
}
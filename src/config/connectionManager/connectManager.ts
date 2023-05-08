import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ConnectionRequest, ConnectionResponse, HttpMethodType } from './connectManager.interface'
export class ConnectionManagerAxios {
    async connect(data: ConnectionRequest): Promise<ConnectionResponse<any>> {

        try {

            if (data.method == null) {
                data.method = HttpMethodType.GET;
            }
            if (data.headers == null) {
                data.headers = {};
            }
            const config: AxiosRequestConfig = {
                url: data.url,
                data: data.content?.body || undefined,
                params: data.content?.query || undefined,
                method: data.method,
                headers: data.headers
            };

            const res = await axios.request(config);

            return ConnectionManagerAxios.fromAxiosResponse(res);
        } catch (e) {
            return ConnectionManagerAxios.fromAxiosError(e);
        }
    }

    static fromAxiosResponse<T>(axiosResp: AxiosResponse): ConnectionResponse<T> {
        const request = {
            'url': axiosResp.config.url,
            'method': axiosResp.config.method,
            'query': axiosResp.config.params,
            'headers': axiosResp.config.headers,
            'body': axiosResp.config.data
        };
        const headers: Record<string, string> = {};
        for (const key in axiosResp.headers) {
            const value = axiosResp.headers[key];
            if (typeof value === 'string') {
                headers[key] = value;
            }
        }
        return { body: axiosResp.data, headers, httpCode: axiosResp.status, request };
    }

    static fromAxiosError<T>(error: AxiosError): ConnectionResponse<T> {
        const headers: Record<string, string> = {};
        for (const key in error.response?.headers) {
          const value = error.response?.headers[key];
          if (typeof value === 'string') {
            headers[key] = value;
          }
        }
        const request = {
          'url': error.config.url,
          'method': error.config.method,
          'query': error.config.params,
          'headers': error.config.headers,
          'body': error.config.data
        };
        const r = {
          'status': error.response?.status,
          'headers': headers,
          'body': error.response?.data
        };
        const meta = { request, response: r };
        return {
          body: error.response?.data,
          headers: headers,
          httpCode: error.response?.status || 0,
          rawResponse: meta
        };
    }


}
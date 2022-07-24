/* eslint-disable no-unused-vars */
export enum HttpStatus {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

export interface HttpResponse<T> {
  message?: string;
  data: T;
  status: number;
  header?: HeadersInit;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ThrowErrorStrategy {
  ThrowOnly,
  ThrowAndNotify,
  NotThrow,
}

export interface HttpOptions {
  queryParams?: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[] | undefined
  >;
  body?: BodyInit;
  headers?: HeadersInit;
  throwError: ThrowErrorStrategy;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchError, Observable, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import addToast from 'shared/components/toastify/add-toast.component';
import { HttpMessage } from 'shared/const/message.const';
import { ACCESS_TOKEN } from 'shared/const/user.const';
import { store } from 'store';
import { logout } from '../redux/slices/user-slice';
import StorageService from '../storage/storage.service';
import { HttpMethod, HttpOptions, ThrowErrorStrategy } from './http.type';

export class HttpService {
  private commonHeader = {
    Accept: 'application/json',
    'Cache-Control': 'no-cache no-store',
    Pragma: 'no-cache',
    Expires: '0',
    'Access-Control-Allow-Origin': '*',
  };

  public get<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(
    uri: string,
    options?: HttpOptions
  ): Observable<T | undefined> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public delete<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  public request<T>(
    uri: string,
    method: HttpMethod,
    options?: HttpOptions
  ): Observable<T> {
    const url = this.resolve(uri);
    return fromFetch(url, {
      method,
      body: JSON.stringify(options?.body),
      headers: this.generateHeader(options?.headers),
    }).pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        }

        if (
          response.status === 401 &&
          !window.location.pathname.includes('login')
        ) {
          addToast({ message: HttpMessage.LOGIN_AGAIN, type: 'error' });
          store.dispatch(logout());
          window.location.href = '/login';
          return of(null);
        }

        throw response;
      }),
      catchError((error: Response) =>
        this.handleError(
          error,
          options?.throwError || ThrowErrorStrategy.NotThrow
        )
      )
    );
  }

  private generateHeader = (header?: HeadersInit): HeadersInit => {
    const token = StorageService.get(ACCESS_TOKEN);

    return {
      ...this.commonHeader,
      ...header,
      token: token || '',
    };
  };

  private handleError(
    error: Response,
    throwErrorStrategy: ThrowErrorStrategy
  ): Observable<any> {
    switch (throwErrorStrategy) {
      case ThrowErrorStrategy.ThrowOnly:
        throw error;
      case ThrowErrorStrategy.ThrowAndNotify:
        addToast({
          message: HttpMessage.PROCESSING_ERROR,
          type: 'error',
        });
        throw error;
      default:
        return of(null);
    }
  }

  private resolve = (uri: string): string => {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${process.env.REACT_APP_BASE_API_URL}${uri}`;
  };
}

export default new HttpService();

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';

import { API_URL, ROUTE_PATHS } from '@/shared/constants';
import { ApiResponseError } from '@/types/api';

const DEFAULT_AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 30000,
};

/* eslint-disable no-param-reassign, @typescript-eslint/no-non-null-assertion */
export default class V1 {
  public client: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.client = axios.create({
      ...DEFAULT_AXIOS_CONFIG,
      ...config,
    });
    this.requestInterceptor();
    this.responseInterceptor();
  }

  async getAccessToken() {
    const session = await getSession();
    if (session?.access_token) {
      return `Bearer ${session?.access_token}`;
    }
    return null;
  }

  get isServer() {
    return typeof window === 'undefined';
  }

  private requestInterceptor() {
    this.client.interceptors.request.use(async config => {
      const token = await this.getAccessToken();
      if (token) {
        config.headers.Authorization = token;
      }

      if (config.data instanceof FormData) {
        return config;
      }

      config.headers['Content-Type'] = 'application/json';

      return config;
    });
  }

  private responseInterceptor() {
    this.client.interceptors.response.use(
      response => response,
      error => this.handleError(error)
    );
  }

  private handleError = (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status >= 500) {
        // Show error page for 5XX status codes
        this.navigateTo(ROUTE_PATHS.INTERNAL_SERVER_ERROR);
        return Promise.reject(error);
      }

      if (status === 403) {
        // Show 403 error page
        this.navigateTo(ROUTE_PATHS.FORBIDDEN);
        return Promise.reject(error);
      }

      // Component will handle this error
      return Promise.reject(error.response?.data as ApiResponseError);
    }

    if (error.request) {
      // Show error page with the messsage form the request
      return Promise.reject({ statusCode: 1000, message: error.message });
    }

    return Promise.reject({ statusCode: undefined, message: error.message });
  };

  private navigateTo = (path: string) => {
    redirect(path);
  };
}
